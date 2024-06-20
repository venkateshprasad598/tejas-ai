import { Divider, Drawer, IconButton, styled } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import "./RelationshipModal.css"

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const GraphPropertiesDrawer = ({ modalOpen, handleModalClose, selectedNode }) => {

    return (
        <div> <Drawer
            anchor={"right"}
            open={modalOpen}
            onClose={handleModalClose}
            PaperProps={{
                style: {
                    width: '350px', // Set the desired width here
                },
            }}
        >
            <DrawerHeader>
                <IconButton onClick={handleModalClose}>
                    <CloseIcon />
                </IconButton>
            </DrawerHeader>


            <Divider />

            <div style={{ padding: "0 1rem" }}>
                <p className="graph-drawer-title">{selectedNode?.name || null}</p>
                <span className="graph-details-heading">Details</span>
                <div className="graph-details">
                    {selectedNode?.properties && Object.keys(selectedNode?.properties)?.length ? (
                        Object.keys(selectedNode?.properties)?.map((data) => {
                            return (
                                <div className="graph-details-main">
                                    <span className="graph-details-title">{data}</span>
                                    <span className="graph-details-desc">{selectedNode?.properties?.[data] || "N/A"}</span>
                                </div>
                            )
                        })
                    ) : "N/A"

                    }
                </div>


            </div>

        </Drawer></div>
    )
}

export default GraphPropertiesDrawer