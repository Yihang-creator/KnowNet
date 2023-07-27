import React, { useState, useEffect, useRef } from 'react';
import Tree from 'react-d3-tree';
import { Button, TextField, Box, Grid, Typography, Snackbar } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useOktaAuth } from '@okta/okta-react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useUserContext } from '../../auth/UserContext';

const textLayout = {
    title: {
      textAnchor: 'start',
      x: 40,
    },
    attribute: {
      x: 40,
      dy: '1.2em',
    },
  };

const InteractiveVideoBuilder = (props) => {
  const { handleClose } = props;
  const [data, setData] = useState({ // tree storing all the data related to current interactive video
    name: 'Root',
    id: uuidv4(),
    attributes: {
      url: '',
      LeadTimeField: 0, // this is the amount of time (in seconds) before the end of the video that the options should be displayed 
    },
    children: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [inputs, setInputs] = useState({
    name: '',
    url: '',
    LeadTimeField: '',
  });

  const [selectedNode, setSelectedNode] = useState(null);
  const { oktaAuth } = useOktaAuth();
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const treeContainerRef = useRef(null);
  const [direction ,setDirection] = useState('horizontal');
  const { userId } = useUserContext();

  useEffect(() => {
    const handleResize = () => {
      if (treeContainerRef.current) {
        const dimensions = {
          x: treeContainerRef.current.offsetWidth / 2, 
          y: treeContainerRef.current.offsetHeight / 2, 
        };
        setTranslate(dimensions);
      }
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleNodeClick = (nodeData, evt) => {
    setSelectedNode(nodeData);
    setInputs({
        name: nodeData.data.name,
        url: nodeData.data.attributes.url,
        LeadTimeField: nodeData.data.attributes.LeadTimeField,
    });
  };

  const onHorizontal = () => {
    setDirection('horizontal')
  };

  const onVertical = () => {
    setDirection('vertical')
  };

  const handleAddChild = () => {
    if (selectedNode) {
      // Copy the data object
      const updatedData = JSON.parse(JSON.stringify(data));

      // Function to add a child to the selected node
      const addChild = (node) => {
        if (node.id === selectedNode.data.id) {
          let newChild = {
            name: 'New Option',
            id: uuidv4(),
            attributes: {
              url: '',
              LeadTimeField: 0,
            },
            children: [],
          };
          node.children = [...node.children, newChild];
        } else if (node.children.length) {
          node.children.forEach(addChild);
        }
      };
      addChild(updatedData);
      setData(updatedData);
    }
  };

  const handleInputChange = (event, field) => {
    setInputs({ ...inputs, [field]: event.target.value });

    if (selectedNode) {
      const updatedData = JSON.parse(JSON.stringify(data));

      const updateNode = (node) => {
        if (node.id === selectedNode.data.id) {
          if (field === 'name') node.name = event.target.value;
          if (field === 'url') node.attributes.url = event.target.value;
          if (field === 'LeadTimeField') node.attributes.LeadTimeField = parseInt(event.target.value, 10);
        } else if (node.children.length) {
          node.children.forEach(updateNode);
        }
      };
      updateNode(updatedData);
      setData(updatedData);
    }
  };

  const onSubmit = () => {
    const validateUrls = (node) => {
        if (node.attributes.url !== '') {
          try {
            new URL(node.attributes.url);
          } catch (_) {
            console.log(`Invalid URL at node with id: ${node.id}`);
            return false; // Invalid URL found
          }
        }
    
        if (node.children.length) {
          return node.children.every(validateUrls);
        }
        return true; // No children, so URL (if it exists) is valid
      };
    
      if (!validateUrls(data)) {
        alert('One or more nodes have an invalid URL. Please check your data and try again.');
        return; // Don't proceed if any URLs are invalid
      }

    fetch('/api/interactiveVideo/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + oktaAuth.getAccessToken()},
      body: JSON.stringify({
        ...data,
        userId: userId,
        mediaType: 'video',
        title: data.name,
        mediaUrl: data.attributes.url,
        text: null,
        })})
      .then(response => {
        if (response.status === 201) {
            // Request succeeded with 201 status code, close the dialog
            handleClose();
        } else {
            setErrorMessage('An error occurred while submitting the form. Please try again later.');
            setSnackbarOpen(true);
        }
       })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('An error occurred while submitting the form. Please try again later.');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setErrorMessage('');
  };

  const renderRectSvgNode = ({ nodeDatum, onNodeClick }) => (
    <>
    <foreignObject 
      x={-10} // adjust these values
      y={-27} // adjust these values
      width={40} // adjust these values
      height={40} // adjust these values
      onClick={evt => {
        // disable toggle node
        onNodeClick(evt);
      }}
    >
      <YouTubeIcon 
        style={{ 
          width: '100%', 
          height: '100%',
          color: selectedNode && nodeDatum.id === selectedNode.data.id ? "red" : "transparent",
        }}
      />
    </foreignObject>
    <g className="rd3t-label">
      <text className="rd3t-label__title" {...textLayout.title}>
        {nodeDatum.name}
      </text>
      {selectedNode &&  nodeDatum.id === selectedNode.data.id && (
        <text className="rd3t-label__attributes">
            {nodeDatum.attributes &&
            Object.entries(nodeDatum.attributes).map(([labelKey, labelValue], i) => (
                <tspan key={`${labelKey}-${i}`} {...textLayout.attribute}>
                {labelKey}: {typeof labelValue === 'boolean' ? labelValue.toString() : labelValue}
                </tspan>
            ))}
        </text>
      )}
    </g>
  </>
  );

  return (
    <Box display="flex" flexDirection='row' justifyContent="center" alignItems="center" height="80vh" maxHeight='100%'>
      <Box ref={treeContainerRef} width={'70%'} height={'100%'}  sx={{boxShadow:2}} flex={3}>
        <Tree data={data} orientation={direction} onNodeClick={handleNodeClick} translate={translate} renderCustomNodeElement={renderRectSvgNode} />
      </Box>
      <Box ml={2} flex={1} width={'30%'}>
        <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
            <Typography variant="h6" fontWeight="bold"> Node editor: select node to edit </Typography>
            </Grid>
            <Grid item>
            <TextField label="Choice Label" value={inputs.name} onChange={(e) => handleInputChange(e, 'name')} />
            </Grid>
            <Grid item>
            <TextField label="URL" value={inputs.url} onChange={(e) => handleInputChange(e, 'url')} />
            </Grid>
            <Grid item>
            <TextField
                type="number"
                label="Lead Time for Option Display"
                value={inputs.LeadTimeField}
                onChange={(e) => handleInputChange(e, 'LeadTimeField')}
            />
            </Grid>
            <Grid item>
            <Button variant="contained" color="primary" onClick={onHorizontal}>
                Horizontal View
            </Button>
            </Grid>
            <Grid item>
            <Button variant="contained" color="primary" onClick={onVertical}>
                Vertical View
            </Button>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={handleAddChild}>
                    Add Child to the current node
                </Button>
            </Grid>
            <Grid item>
            <Button variant="contained" color="primary" onClick={onSubmit}>
                Upload Video
            </Button>
            </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={errorMessage}
      />
    </Box>
  );
};

export default InteractiveVideoBuilder;