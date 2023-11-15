import { Link, Typography } from "@mui/material"


export default function AboutUs() {
  return (
    <>
      <Typography variant="h1">About us</Typography>
      <br/>

      <Typography variant="body" display="block">
        We at Student Meals know how difficult it can be to cook a good meal with the limited ingredients,
        equipment, money, and time of a student. With our recipe finder, this is easier than ever before.
      </Typography>

      <br/>

      <Typography variant="body" display="block">
        Contact us at: <Link href="mailto:studentmeals@studentmeals.site">studentmeals@studentmeals.site</Link>
      </Typography>
    </>
  )
}
