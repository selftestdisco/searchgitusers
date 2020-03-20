import React, {Component} from 'react';
import * as R from 'ramda';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import {fetchAllUsers,selectUser} from '../Actions/actions';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchedusers : [],
            hideList: true,
            searchValue:''
        }
    }
    componentDidMount(){
        this.props.fetchAllUsers();
    }

    onSearch = (e) => {
        this.setState({searchValue:e.target.value});
        if(e.target.value !== ''){
            let searchTerm = R.toLower(e.target.value);
            this.setState({searchedusers: R.filter(user => {
                if(user.login.toLowerCase().indexOf(searchTerm) !== -1)
                    return user;   
            },this.props.users),hideList:false});
        }else{
            this.setState({searchedusers:[],hideList:true});
        }
    }

    onSelect = (e) => {
        this.props.selectUser(this.state.searchedusers[e.target.id]);
        this.setState({hideList:true,searchValue:''})
    }
    render(){
        const {selectedUser} = this.props;
        return (
            <Container>
                <CssBaseline>
                    <div>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            label="Search Git User"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SearchIcon />
                                  </InputAdornment>
                                ),
                            }}
                            autoComplete="search"
                            onChange={this.onSearch}
                            value={this.state.searchValue}
                        />
                        {
                            (!this.state.hideList) &&
                            <div style={{position:'absolute',zIndex:1,background:'#ADD8E6',width:'50%'}}>
                            {
                                this.state.searchedusers.length !== 0 ?
                                this.state.searchedusers.map((user,index) => {
                                    return (
                                        <div key={user.login}>
                                            <span id={index} onClick={this.onSelect}>{user.login}</span></div>
                                    )
                                })
                                :
                                <div>No Users found</div>
                            }
                            </div>
                        }
                        {
                            Object.values(selectedUser).length !== 0 && 
                            <div>
                                <span>
                                    {selectedUser.login}
                                </span>
                                <a href={selectedUser.html_url} rel="noopener noreferrer" target="_blank">
                                    <img src={selectedUser.avatar_url} style={{height: '100px', width: '100px', marginLeft:'10px'}}
                                    alt="no_img" />
                                </a>
                            </div>
                        }
                    </div>
                </CssBaseline>
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
        users: state.users,
        selectedUser: state.selectedUser
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    selectUser: (data) => dispatch(selectUser(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(Search);