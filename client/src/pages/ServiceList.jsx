import * as React from 'react';
import Navbar from '../components/Navbar/Navbar';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Container,
  Avatar,
  Link,
  Grid,
  Button,
  CardActions,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
// import { convertLength } from '@mui/material/styles/cssUtils';
import { useState, useEffect } from 'react';
import ProfileNav from '../components/Navbar/ProfileNav';
import { format } from 'date-fns';

const theme = createTheme();

export default function ProfileService(props) {
  console.log('Service List', props);
  const userInfo = props.user && props.user;
  const [services, setServices] = useState([]);
  const url = 'api/services/';

  useEffect(() => {
    axios.get(`${url}${userInfo.id}`).then((response) => {
      setServices(response.data.services);
      console.log('AAA++++++++++', response.data.services);
    });
  }, [userInfo.id]);

  // remove service

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        // title: title,
        // description: description,
        // fee: fee,
        // category: category,
        user_id: userInfo.id,
      };
      console.log('remove service data', data);

      const newResponse = await axios({
        method: 'post',
        url: `api/services/remove`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        withCredentials: true,
      });
      console.log('*****', newResponse);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <main>
        <Grid container>
          <Grid item xs={4}>
            <Container maxWidth="sm">
              <Card sx={{ width: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="https://htmlstream.com/preview/front-dashboard-v2.0/assets/img/160x160/img6.jpg"
                    sx={{ width: 1 / 2, height: 1 / 2 }}
                  />
                </Box>
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h5" color="text.secondary">
                    {userInfo.first_name} {userInfo.last_name}
                  </Typography>
                </CardContent>

                <ProfileNav />
              </Card>
            </Container>
          </Grid>

          <Grid item xs={8}>
            {services.map((s) => {
              return (
                <Container maxWidth="sm">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', md: 'row' },
                      bgcolor: 'background.paper',
                      overflow: 'hidden',
                      boxShadow: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 1,
                        width: 1 / 4,
                      }}
                      alt="The house from the offer."
                      src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                    />
                    <Box sx={{ width: 3 / 4 }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Category : {s.category}
                        </Typography>
                        <Typography>
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarIcon />
                          <StarTwoToneIcon />
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h4">
                          Title : {s.title}
                        </Typography>
                        <Typography>Fee : {s.fee}</Typography>
                        <br />
                        <Typography>Description: {s.description}</Typography>
                      </CardContent>

                      <CardActions>
                        <Button size="small" variant="contained">
                          1PM - 2PM
                          {/* {format(new Date(s.start_time), 'ha')} -{' '}
                          {format(new Date(s.end_time), 'ha')} */}
                        </Button>
                        <Button size="small" variant="contained">
                          1PM - 2PM
                          {/* {format(new Date(s.start_time), 'ha')} -{' '}
                          {format(new Date(s.end_time), 'ha')} */}
                        </Button>
                      </CardActions>

                      <CardActions>
                        <Grid
                          container
                          spacing={1}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Grid item xs={6}>
                            <Link
                              to={`/ProfileServiceEdit/${s.id}`}
                              serviceid={s.id}
                              component={RouterLink}
                              style={{ textDecoration: 'none' }}
                            >
                              <Button variant="contained" sx={{ width: 1 }}>
                                Edit
                              </Button>
                            </Link>
                          </Grid>
                          <Grid justifyContent="end" item xs={6}>
                            <Link
                              onClick={handleSubmit}
                              style={{ textDecoration: 'none' }}
                            >
                              <Button
                                variant="contained"
                                color="error"
                                sx={{ width: 1 }}
                              >
                                Delete
                              </Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Box>
                  </Box>
                  <br />
                </Container>
              );
            })}
          </Grid>
        </Grid>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom></Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          We Help You!
        </Typography>
        {/* <Copyright /> */}
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}