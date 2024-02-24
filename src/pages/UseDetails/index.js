import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function UserDetails({ data }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={data.name} src={data.username?.charAt(0)} />
                </ListItemAvatar>
                <ListItemText
                    primary={data?.username}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'block' }}
                                component="div"
                                variant="body2"
                                color="text.primary"
                            >
                                <a href={`mailto:${data.email}`}>{data?.email}</a>
                            </Typography>
                            {data.address?.city} {" "}
                            {data.address?.street}
                            <Typography variant='subtitle' component={"div"}>
                                <a href={data.website}>{data.website}</a>
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </List>
    );
}