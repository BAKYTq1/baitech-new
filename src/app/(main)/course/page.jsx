import { permanentRedirect } from 'next/navigation'

const COURSES_URL = 'https://baitech.tilda.ws/151565'

function page() {
  permanentRedirect(COURSES_URL)
}

export default page
