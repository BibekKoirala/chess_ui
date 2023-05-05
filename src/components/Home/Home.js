import { Grid, Paper, styled } from "@mui/material";
import SignIn from "./Signin";
import Color from "../../Theme/Color"
import HomeChess from "./HomeChess";


export default function Home() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <SignIn />
        </Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <HomeChess />
        </Grid>
      </Grid>
    </div>
  );
}
