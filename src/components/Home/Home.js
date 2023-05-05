import { Grid, Paper, styled } from "@mui/material";
import SignIn from "./Signin";
import Color from "../../Theme/Color"
import HomeChess from "./HomeChess";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? Color.Primary : Color.Secondary,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
