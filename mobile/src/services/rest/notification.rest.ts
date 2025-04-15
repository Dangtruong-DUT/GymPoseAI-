import { BaseQueryConfig } from '@/src/types/utils.type'
import http from '../core/httpClient'
import { URL_NOTIFICATION } from '@env'
import { ResponseAPINotificationPage } from '@/src/types/notification.type'

const notificationApi = {
    getNotification({ params }: { params: BaseQueryConfig }) {
        return http.get<ResponseAPINotificationPage>(`${URL_NOTIFICATION}`, {
            params
        })
    },
    readNotification({ id }: { id: string }) {
        return http.put(`${URL_NOTIFICATION}/${id}/read`)
    },
    deleteNotification({ id }: { id: string }) {
        return http.delete(`${URL_NOTIFICATION}/${id}/delete`)
    }
}

export default notificationApi
