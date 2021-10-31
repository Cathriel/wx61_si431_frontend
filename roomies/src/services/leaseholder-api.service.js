import http from './http.common';

class LeaseholdersApiService {
    getAll() {
        return http.get('/leaseholders');
    }
    get(id) {
        return http.get(`/leaseholders/${id}`)
    }
    create(planId,data) {
        return http.post(`/leaseholders/plans/${planId}/leaseholders`, data);
    }
    update(id, data) {
        return http.put(`/leaseholders/${id}`, data);
    }
    delete(id) {
        return http.delete(`/leaseholders/${id}`);
    }
}

export default new LeaseholdersApiService()