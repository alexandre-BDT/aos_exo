import React from 'react';
import {Paper, Grid, Typography, TextField, Button, Snackbar} from '@material-ui/core'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      check: false,
      error: '',
    }
  }

  onEmailChange(event) {
    this.setState({email: event.target.value})
  }

  onPasswordChange(event) {
    this.setState({password: event.target.value})
  }

  async handleSignin() {
    try {
      const res = await fetch('http://localhost:4242/auth/login', {
        method: 'get',
        headers: {
          email: this.state.email,
          password: this.state.password
        }
      })
      if (res.status == 200) {
        this.props.history.push('/Success')
      } else {
        this.setState({error: 'Wrong authentication', check: true})
      }
    } catch(err) {
      this.setState({error: 'Wrong authentication', check: true})
      console.log(err)
    }
  }

  handleRegister() {
    this.props.history.push('/register')
  }

  handleClose() {
    this.setState({check: false})
  }
  
  render() {
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
            </Grid><br/>
            <Grid item xs={6}>
              <Button onClick={this.handleRegister.bind(this)} style={styles.button}>Register</Button>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={this.handleSignin.bind(this)} style={styles.button}>Signin</Button>
            </Grid>
          </Grid>
        </Paper>
        {
        this.state.check
        ?
        <Snackbar open={this.state.check} autoHideDuration={6000} onClose={this.handleClose.bind(this)} message={this.state.error}></Snackbar>
        :
        <div></div>
        }
      </div>
    );
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

export default App;
