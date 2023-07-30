import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const UsageGuide = () => (
  <Card sx={{ margin: 1 }}>
    <CardContent sx={{ width: '100%' }}>
      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
        How to Use This Interactive Video Editor
      </Typography>
      <Typography variant="body2">
        You can interact with the nodes and view different levels of the tree
        structure. Here are some basic instructions for navigation:
        <Box
          component="ul"
          sx={{
            '& li::before': {
              content: '"• "',
              color: 'text.primary',
              fontWeight: 'bold',
              paddingRight: 1,
            },
          }}
        >
          <li>
            Click on a node to edit its <strong>URL</strong>,{' '}
            <strong>labels</strong> and <strong>LeadTimeField</strong>.
          </li>
          <li>
            Click on <strong>Horizontal View</strong> or{' '}
            <strong>Vertical View</strong> to adjust the direction of the tree
          </li>
          <li>
            Click on <strong>ADD CHILD TO THE CURRENT NODE</strong> to add a
            child video to the currently selected node
          </li>
          <li>Use the mouse wheel to zoom in or out.</li>
          <li>Click and drag to move the tree around.</li>
        </Box>
      </Typography>
    </CardContent>
  </Card>
);
