import React from 'react'
import {Button, Paper, Grid, TextField, Typography, Snackbar} from '@material-ui/core'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password1: '',
			password2: '',
			error: '',
			open:false,
		}
	}

	async handleRegister() {
		if (this.state.password1 !== this.state.password2) {
			this.setState({ error: 'Passwords doesn\'t match', open: true})
		} else if (!this.state.email || !this.state.password1 || !this.state.password2) {
			console.log(this.state)
			this.setState({ error: 'All field must be filled', open: true})
		} else {
			try {
				const res = await fetch('http://localhost:4242/auth/register', {
					method: 'post',
					headers: {
						email: this.state.email,
						password1: this.state.password1,
						password2: this.state.password2
					}
				})
				console.log(res)
				if (res.status == 401)
					this.setState({ error: "User already exist", open: true})
				else if (res.status == 404)
					this.setState({ error: "Not found", open: true})
				else
					this.props.history.push('/')
			} catch(error) {
				console.log(error)
			}
		}
	}

	onEmailChange(event) {
		this.setState({email: event.target.value})
	}

	onPasswordChange(event) {
		this.setState({password1: event.target.value})
	}

	onPasswordChange2(event) {
		this.setState({password2: event.target.value})
	}

	handleBack() {
		this.props.history.push('/')
	}

	handleClose() {
		this.setState({open: false})
	}

	render(){
		return (
			<div>
        <Paper style={styles.paper} elevation={10}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography>Email</Typography>
              <TextField onChange={this.onEmailChange.bind(this)} label='email' required></TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography>Password</Typography>
              <TextField onChange={this.onPasswordChange.bind(this)} label='password' required type='password'></TextField>
            </Grid>
						<Grid item xs={12}>
							<Typography>Password confirmation</Typography>
							<TextField onChange={this.onPasswordChange2.bind(this)} label='password' required type='password'></TextField>
						</Grid>
						<br/>
            <Grid item xs={12}>
              <Button onClick={this.handleRegister.bind(this)} style={styles.button}>Register</Button>
            </Grid>
						<Grid item xs={12}>
							<Button onClick={this.handleBack.bind(this)} style={styles.button}>Back</Button>
						</Grid>
          </Grid>
        </Paper>
				<Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose.bind(this)} message={this.state.error}>
				</Snackbar>
			</div>
		)
	}
}

const styles = {
  paper: {
    marginTop: '15%',
    marginLeft: '25%',
    marginRight: '25%',
    textAlign: 'center',
    backgroundColor: '#f5f6fa'
  },
  button: {
    backgroundColor: '#dcdde1'
  }
}

export default Register