import { Typography } from "@mui/material"


export default function Profile() {
  return (
    <>
      <Typography variant="h1" sx={{ mb: 4 }}>Profile</Typography>

      <Typography variant="body" display="block">
          You are using the site as a non-registered user. Registration and user profiles are not available yet.
          Please use a unique author name for your recipes and respect others by editing only your own content.
      </Typography>
    </>
  )
}
