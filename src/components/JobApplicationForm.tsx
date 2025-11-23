'use client';

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle, AlertCircle, Upload, Plus, Trash2, Send } from 'lucide-react'
import Header from './Header'
import Footer from './Footer'
import AOS from 'aos'
import 'aos/dist/aos.css'

interface JobSummary {
  id: number;
  Label: string;
  Value: string;
}

interface APIJobData {
  id: number;
  documentId: string;
  title: string;
  location: string;
  department: string;
  validityStart: string;
  validityEnd: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  JobStatus: string;
  CompanyProfile: string;
  RequirementsAndSkills: string[];
  Detailskills: string[];
  ApplicationProcedure: string;
  JobSummary: JobSummary[];
}

interface APIResponse {
  data: APIJobData[];
  meta: Record<string, any>;
}

interface Experience {
  employerName: string;
  jobDescription: string;
}

interface Skill {
  skillName: string;
  skillLevel: string;
}

interface ApplicationForm {
  idDocumentNumber: string;
  fullNames: string;
  phoneNumber: string;
  email: string;
  positionApplied: string;
  educationalBackground: string;
  experienceSummary: string;
  certifications: string;
  universityName: string;
  otherSkills: string;
  cvBase64: string;
  cvExtension: string;
  experiences: Experience[];
  skills: Skill[];
}

const JobApplicationForm: React.FC = () => {
  const { documentId } = useParams<{ documentId: string }>()
  const router = useRouter()
  const [jobTitle, setJobTitle] = useState<string>('')
  const [jobSkills, setJobSkills] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')

  const [formData, setFormData] = useState<ApplicationForm>({
    idDocumentNumber: '',
    fullNames: '',
    phoneNumber: '',
    email: '',
    positionApplied: '',
    educationalBackground: '',
    experienceSummary: '',
    certifications: '',
    universityName: '',
    otherSkills: '',
    cvBase64: '',
    cvExtension: '',
    experiences: [{ employerName: '', jobDescription: '' }],
    skills: []
  })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out'
    })
  }, [])

  useEffect(() => {
    const fetchJobData = async () => {
      if (!documentId) {
        router.push('/careers')
        return
      }

      try {
        setLoading(true)
        const response = await fetch(`https://primelife.prime.rw:8080/api/job-managements?populate=*`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)

        }

        const result: APIResponse = await response.json()
        const jobData = result.data.find(job => job.documentId === documentId)

        if (!jobData) {
          throw new Error('Job not found')
        }

        setJobTitle(jobData.title)
        setJobSkills(jobData.Detailskills || [])
        console.log("jobData.Detailskills", jobData.Detailskills)

        // Initialize form with job data
        const initialSkills = (jobData.Detailskills || []).map(skill => ({
          skillName: skill,
          skillLevel: ''
        }))

        setFormData(prev => ({
          ...prev,
          positionApplied: jobData.title,
          skills: initialSkills
        }))
      } catch (err) {
        console.error('Error fetching job data:', err)
        router.push('/careers')
      } finally {
        setLoading(false)
      }
    }

    fetchJobData()
  }, [documentId, router])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['application/pdf']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64String = event.target?.result as string
      const base64Data = base64String.split(',')[1]
      const extension = file.name.split('.').pop() || 'pdf'

      setFormData(prev => ({
        ...prev,
        cvBase64: base64Data,
        cvExtension: extension
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { employerName: '', jobDescription: '' }]
    }))
  }

  const handleRemoveExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }))
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const handleSkillChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, skillLevel: value } : skill
      )
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      // Validate required fields
      if (!formData.cvBase64) {
        throw new Error('Please upload your CV')
      }

      // Filter out empty experiences
      const validExperiences = formData.experiences.filter(
        exp => exp.employerName.trim() && exp.jobDescription.trim()
      )

      // Filter out skills with no level selected
      const validSkills = formData.skills.filter(skill => skill.skillLevel.trim())

      if (validSkills.length === 0) {
        throw new Error('Please rate your skill levels')
      }

      const payload = {
        ...formData,
        experiences: validExperiences.length > 0 ? validExperiences : [],
        skills: validSkills
      }

      const response = await fetch('https://apps.prime.rw/customerbackend/api/job-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorText = await response.text();

        // Show SQL error from backend
        if (errorText.includes("PRIMARY KEY")) {
          throw new Error("You have already submitted an application.");
        }

        throw new Error(errorText || 'Failed to submit application');
      }
      try {
        const emailBody = `Dear ${formData.fullNames},

Thank you for applying for the position of ${jobTitle} at Prime Life Insurance.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPLICATION CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Your application has been successfully submitted with the following details:

Position Applied: ${jobTitle}
Application Date: ${new Date().toLocaleDateString()}
Name: ${formData.fullNames}
Email: ${formData.email}
Phone: ${formData.phoneNumber}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What happens next?

1. Our HR team will review your application
2. Shortlisted candidates will be contacted within 2-3 weeks
3. If selected, you will be invited for an interview

If you have any questions, please contact our HR department at hr@prime.rw

We appreciate your interest in joining Prime Life Insurance!

Best regards,
Prime Life Insurance HR Team
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

        await fetch('https://apps.prime.rw/onlineservicesapi/DigitalServices/sendEmailNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            subject: `Application Confirmation - ${jobTitle}`,
            body: emailBody
          }),
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't throw error - application was successful even if email fails
      }


      setSubmitSuccess(true)

      // Redirect after success
      // setTimeout(() => {
      //   router.push('/careers')
      // }, 3000)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit application')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900">Loading application form...</h1>
        </div>
        <Footer />
      </div>
    )
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center" data-aos="fade-up">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for applying for the position of <span className="font-semibold">{jobTitle}</span>.
              <br />
              We will review your application and get back to you soon.
            </p>
            <button
              onClick={() => router.push('/careers')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Careers
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6" data-aos="fade-right">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Job Details
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Application</h1>
          <p className="text-lg text-gray-600">Applying for: <span className="font-semibold text-gray-900">{jobTitle}</span></p>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center" data-aos="fade-up">
            <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
            <span className="text-red-800">{submitError}</span>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ID Document Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.idDocumentNumber}
                  onChange={(e) => setFormData({ ...formData, idDocumentNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Valid National Id"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Names <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullNames}
                  onChange={(e) => setFormData({ ...formData, fullNames: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full Names"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="078....."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email Address"
                />
              </div>
            </div>
          </div>

          {/* Educational Background */}
          <div className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Educational Background</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.universityName}
                  onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="University of Rwanda"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highest Degree <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.educationalBackground}
                  onChange={(e) => setFormData({ ...formData, educationalBackground: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Degree"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications
                </label>
                <input
                  type="text"
                  value={formData.certifications}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., CPA, PMP, Cisco CCNA"
                />
              </div>
            </div>
          </div>

          {/* Experience Summary */}
          <div className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.experienceSummary}
                onChange={(e) => setFormData({ ...formData, experienceSummary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Briefly describe your professional experience..."
              />
            </div>

            {/* Detailed Work Experience */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Detailed Work Experience (Optional)
                </label>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Experience
                </button>
              </div>

              <div className="space-y-4">
                {formData.experiences.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm font-medium text-gray-700">Experience {index + 1}</span>
                      {formData.experiences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Employer Name"
                        value={exp.employerName}
                        onChange={(e) => handleExperienceChange(index, 'employerName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Job Description"
                        rows={3}
                        value={exp.jobDescription}
                        onChange={(e) => handleExperienceChange(index, 'jobDescription', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Assessment */}
          <div className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills Assessment</h2>

            <p className="text-sm text-gray-600 mb-4">
              Please rate your proficiency level for each required skill:
            </p>

            <div className="space-y-4">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="flex-1 font-medium text-gray-700">{skill.skillName}</label>
                  <select
                    required
                    value={skill.skillLevel}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Proficiency Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                    <option value="Fluent">Fluent</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Skills
              </label>
              <textarea
                rows={3}
                value={formData.otherSkills}
                onChange={(e) => setFormData({ ...formData, otherSkills: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="List any additional relevant skills (e.g., Soft skills, Project Management, etc.)"
              />
            </div>
          </div>

          {/* CV Upload */}
          <div className="bg-white rounded-lg shadow-md p-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload CV</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CV/Resume <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <Upload className="h-6 w-6 text-gray-400 mr-3" />
                  <span className="text-gray-600">
                    {fileName || 'Choose file (PDF or Word, max 5MB)'}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    required={!formData.cvBase64}
                  />
                </label>
              </div>
              {formData.cvBase64 && (
                <p className="mt-2 text-sm text-green-600 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  File uploaded successfully
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4" data-aos="fade-up">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}

export default JobApplicationForm