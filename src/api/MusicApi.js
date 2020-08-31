import instance from "@/api/request";

const RequestMusicList = (pageNo, pageSize) => {
    return instance({
        url: '/api/song/list',
        method: 'get',
        params: {
            pageNo,
            pageSize
        }
    })
}

export { RequestMusicList }
