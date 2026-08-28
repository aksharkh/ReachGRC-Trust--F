import statusData, { type ServiceGroup } from '../data/statusData';

const STATUS_API_URL = 'http://localhost:8081/api/status';

export const fetchSystemStatus = async (): Promise<ServiceGroup[]> => {
  try {
    const res = await fetch(STATUS_API_URL);
    if (res.ok) {
      const data: ServiceGroup[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Backend /api/status unreachable, using local fallback status data:', error);
  }
  return statusData;
};

export const updateServiceStatus = async (
  serviceId: number, 
  status?: string, 
  uptime?: number
): Promise<boolean> => {
  try {
    const res = await fetch(`${STATUS_API_URL}/service/${serviceId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, uptime })
    });
    return res.ok;
  } catch (error) {
    console.error('Failed to update service status:', error);
    return false;
  }
};
