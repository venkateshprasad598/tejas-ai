import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import React from "react";
import "./RelationshipModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function ShowMoreGraph({
  openShowMoreModal,
  handleClose,
  handleShowMore,
  handleInfo,
  node,
}) {
  return (
    <Modal open={openShowMoreModal} onClose={handleClose}>
      <Box sx={style}>
        <div className="model-header-title">Overview</div>
        <div className="relationship-info">
          <div className="relationship-info-details">
            <h3 className="relationship-info-desc">{node.name || "N/A"}</h3>
          </div>

          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleInfo}
              style={{ marginTop: "10px" }}
            >
              Info
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
              onClick={handleShowMore}
            >
              Show More
            </Button>
          </Stack>
        </div>
      </Box>
    </Modal>
  );
}

export default ShowMoreGraph;
