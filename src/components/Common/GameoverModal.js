import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import "./css/GameoverModal.css"; // Updated CSS for styling
import { connect } from "react-redux";
import bot from "../../Images/Bot.png";
import human from "../../Images/Human.png";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function GameOverModal({
  result,
  reason,
  opponent,
  onRematch,
  onNewGame,
  onClose,
  user,
}) {
  return (
    <Dialog open={true} onClose={onClose} maxWidth>
      <DialogTitle
        style={{ textAlign: "center", font: "menu", fontSize: "bold" }}
      >
        Game Over
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent style={{ padding: 50 }}>
        <div className="result-message">
          {result === "win" && <p className="win">You Won!</p>}
          {result === "lose" && <p className="lose">You Lost!</p>}
          {result === "draw" && <p className="draw">It’s a Draw!</p>}
        </div>

        <div className="game-reason">
          <p>By {reason}</p>
        </div>

        {/* Avatars and Names Section */}
        <div className="container2 gameover-icons">
          <div
            style={{
              borderColor: `${
                result === "win"
                  ? "#28a745"
                  : result === "draw"
                  ? "#ffc107"
                  : "#dc3545"
              }`,
              backgroundColor: `${
                result === "win"
                  ? "#d4edda"
                  : result === "draw"
                  ? "#fff3cd"
                  : "#f8d7da"
              }`,
            }}
            className="settingoptions"
          >
            <Avatar
              alt={user.username}
              variant="square"
              sx={{ width: 66, height: 66 }}
              src={human}
            />
            <Typography variant="caption">{user.username}</Typography>
          </div>

          <div class="divider">
            <span>vs</span>
          </div>

          <div
            style={{
              borderColor: `${
                result === "lose"
                  ? "#28a745"
                  : result == "draw"
                  ? "#ffc107"
                  : "#dc3545"
              }`,
              backgroundColor: `${
                result === "lose"
                  ? "#d4edda"
                  : result == "draw"
                  ? "#fff3cd"
                  : "#f8d7da"
              }`,
            }}
            className="settingoptions"
          >
            {opponent == "BOT" ? (
              <>
                <Avatar
                  alt="Bot"
                  variant="square"
                  sx={{ width: 66, height: 66 }}
                  src={bot}
                />
                <Typography variant="caption">{opponent}</Typography>
              </>
            ) : (
              <>
                <Avatar
                  alt={opponent}
                  variant="square"
                  sx={{ width: 66, height: 66 }}
                  src={human}
                />
                <Typography variant="caption">{opponent}</Typography>
              </>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions className="modal-actions">
        <Button onClick={onRematch} className="action-button">
          Rematch
        </Button>
        <Button onClick={onNewGame} className="action-button">
          New Game
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  user: state.User,
});

export default connect(mapStateToProps)(GameOverModal);
