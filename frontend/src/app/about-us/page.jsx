import { Link, Typography } from "@mui/material"


export default function AboutUs() {
  return (
    <>
      <Typography variant="h1">About us</Typography>
      <br/>

      <Typography variant="body" display="block">
        We are two students from Aalto University, who had a vision to create
        something great to improve the lives of students. We know how difficult
        it can be to cook a good meal with the limited time, money, and
        resources.  With this in mind, Student Meals was born. This service lets
        you search for existing recipes made by your community by typing any
        ingredients and equipment onto the search bar that you have at your
        disposal. This makes cooking easier than ever. In addition, you can now
        add your own favourite recipes by inputting the cost, ingredients,
        equipment, and guide for others. These two functionalities are the heart
        of Student Meals.
      </Typography>

      <br/>

      <Typography variant="body" display="block">
        Contact us at: <Link href="mailto:studentmeals@studentmeals.site">studentmeals@studentmeals.site</Link>
      </Typography>
    </>
  )
}
