import axios from 'axios'

export const getImage = (canvasRef, id) => {
  let ctx = canvasRef.current.getContext('2d')
  const img = canvasRef.current.toDataURL()

  return axios.get(`https${process.env.REACT_APP_SERVER_URL}image?id=${id}`,{ img })
    .then((response) => {
      const img = new Image()
      img.src = response.data
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    })
    .catch((err) => {
      if (err.response.status === 404) {
        postImage(canvasRef, id)
      }
    })
}

export const postImage = (canvasRef, id) => {
  const img = canvasRef.current.toDataURL()

  return axios.post(`https${process.env.REACT_APP_SERVER_URL}image?id=${id}`, { img })
    .then((response) => console.log(response.data))
}
