import { 
	Container,
	Grid,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	FormControl, 
	RadioGroup,
	Radio,
	FormControlLabel,
	Button,
	Box
} 				from '@material-ui/core';
import React 	from 'react';  

import data from './data';

export default class Main extends React.Component{

	constructor(props){
		super(props);
		this.state = { 
			data,
			checked: data.menus.map((value, index)=>{
				return null
			})
		}
	}

	render(){

		return(
			<Container fixed>
				<Grid container spacing={3}>
					<Grid item xs={3} sm={3} ></Grid>
					<Grid item xs={6} sm={6} >

						<Box mt={5} mb={5}>
							<Typography variant={"h5"}>
								Station Five's Tech Test
							</Typography>
						</Box>

						{this.state.data.menus.map((value, index)=>{

							return(

								<Accordion key={index} defaultExpanded={true} expanded={index == 0 ? true : this.state.checked[index - 1] != null ? true : false}>
									<AccordionSummary
										expandIcon={<></>}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography>Group {index+1}</Typography>
									</AccordionSummary>
									<AccordionDetails>
										<FormControl component="fieldset"> 
											<RadioGroup 
												aria-label="gender" 
												name="gender1" 
												value={this.state.checked[index]} 
												onChange={(event)=>{
													var checked = this.state.checked;
													checked[index] = event.target.value;
													this.setState({checked})
												}}
											> 
												{value.map((val, i)=>{

													return  <FormControlLabel key={i} disabled={this.is_disabled(index, val.id)} value={val.id} control={<Radio />} label={val.value} />

												})} 
											</RadioGroup>
										</FormControl>
									</AccordionDetails>
								</Accordion>

							)

						})}
						<Box mt={2} display="flex" justifyContent="flex-end">
							<Button color="primary" variant="contained" position={"right"}  disabled={this.state.checked.indexOf(null) > -1 ? true : false}>
							 	Submit
							</Button>
						</Box>
					</Grid>
				</Grid>
				
			</Container>
			
		)

	}

	is_disabled(index, id){

		if(index == 0){
			return false;
		}

		var not_compatible = this.state.checked.filter((val, i)=>{

			var rules = this.state.data.rules[val];
			if(rules){ 
				return rules.filter((v, x)=>{
					return v == id;
				}).length > 0 ? true : false;
			}

			return false;

		}).length > 0 ? true : false;   

		return not_compatible; 

	}

}