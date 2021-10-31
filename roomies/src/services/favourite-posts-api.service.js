import http from './http.common';

class FavouritePostsApiService {
    getAllByLeaseholderId(leaseholderId) {
        return http.get(`/leaseholders/${leaseholderId}/posts`);
    }
    assign(leaseholderId,postId) {
        return http.post(`/leaseholders/${leaseholderId}/posts/${postId}`);
    }
    unassign(leaseholderId, postId) {
        return http.delete(`leaseholders/${leaseholderId}/posts/${postId}`);
    }
}

export default new FavouritePostsApiService()