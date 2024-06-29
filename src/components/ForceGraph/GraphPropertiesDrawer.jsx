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

    const orderedKeys = ["event_type", "event_summary", "expected_minimum_strength", "expected_maximum_strength", "start_event_date", "start_event_time", "end_event_date", "end_event_time", "role_in_event", "designation", "contact_no", "Venue", "Reason", "Nature_of_Event", "Route", "start_point", "mid_points", "end_point"]
    const formatKey = (key) => {
        return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
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
                        orderedKeys.map((data, key) => {
                            if (selectedNode.properties.hasOwnProperty(data)) {

                                return (
                                    <div className="graph-details-main">
                                        <span className="graph-details-title">{formatKey(data)}</span>
                                        <span className="graph-details-desc">{selectedNode?.properties?.[data] || "N/A"}</span>
                                    </div>
                                )
                            }
                            return null
                        })
                    ) : "N/A"

                    }
                </div>


            </div>

        </Drawer></div>
    )
}

export default GraphPropertiesDrawer