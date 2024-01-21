'use client'

import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import Image from 'mui-image';

export default function RecipeCard({ recipe }) {

  return (
    <>
      <Card sx={{ backgroundColor: '#fffcf8', p: 1 }}>
        <CardContent>
          <Stack direction="row" spacing={4}>

            <Box sx={{ width: '30%' }}>
              <Image src={recipe.imgUrl ?? "/default-recipe-image.png"}
               alt="Image of the meal" />
            </Box>

            <Box sx={{ width: '70%' }}>
              <Stack spacing={3} sx={{ textAlign: 'left' }}>
                <Link href={{ pathname: '/recipe', query: { id: `${recipe.id}` } }}
                 variant="h5" underline="hover"
                >
                  {recipe.title}
                </Link>

                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" display="inline"
                   sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
                  >
                    {recipe.pricePerMeal ?? "-"} €
                  </Typography>

                  <Typography variant="body2" display="inline"
                   sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
                  >
                    {recipe.ingredients.length} ingredient{recipe.ingredients.length === 1 ? "" : "s"}
                  </Typography>

                  <Typography variant="body2" display="inline"
                   sx={{ background: '#fff3e0', borderRadius: '25px', border: '1.0px solid #eeeeee', px: 2.0, py: 0.7}}
                  >
                    {recipe.equipment.length} equipment
                  </Typography>
                </Stack>

                <Typography variant="body1" sx={{fontStyle: 'italic'}}>{"by " + (recipe.author ?? "Guest User")}</Typography>
              </Stack>
            </Box>

          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
