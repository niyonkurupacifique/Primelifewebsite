const API_BASE_URL = 'http://10.10.1.17:1338/api'

export type SalesAgentApiItem = {
  id: number
  documentId: string
  AgentName: string
  Phone: string
  Email: string
  Year: string
  Quarter: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type SalesAgentsApiResponse = {
  data: SalesAgentApiItem[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type SalesAgent = {
  id: number
  name: string
  phone: string
  email: string
  year: string
  quarter: string
}

export const fetchSalesAgents = async (): Promise<{ agents: SalesAgent[]; header: { year: string; quarter: string } | null }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sales-agents`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: SalesAgentsApiResponse = await response.json()
    const items = Array.isArray(data?.data) ? data.data : []
    const agents: SalesAgent[] = items.map(item => ({
      id: item.id,
      name: item.AgentName,
      phone: item.Phone,
      email: item.Email,
      year: item.Year,
      quarter: item.Quarter
    }))

    const first = items[0]
    const header = first ? { year: first.Year, quarter: first.Quarter } : null
    return { agents, header }
  } catch (error) {
    console.error('Error fetching sales agents:', error)
    return { agents: [], header: null }
  }
}


