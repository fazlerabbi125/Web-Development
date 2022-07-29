import React from 'react'
import withHoc from '../../utils/withHoc'
import { axInstance } from '../../hooks/useAxios';
import {getTokens} from "../../utils/handleStorage";
import { useNavigate } from "react-router-dom";
import MessageContext from "../../contexts/MessageContext";
import UserManagementForm from '../../components/UserManagementForm';

function CreateTrainingUsers() {
    const navigate = useNavigate(); //hook for re-direct
    const {setMessage}=React.useContext(MessageContext);
    const [error, setError] = React.useState(null);

    function handleAdd(inputs){
        axInstance.post('/admin/create-employee', inputs,{
            headers: {
                'Authorization': `Bearer ${getTokens().accessToken}`
            }
        })
            .then(function (response) {
                if (!response.data || !response.data.success){
                    console.log(response.response.data.errors);
                    throw new Error(response.response.data.message);
                }
                setMessage("Your user has been added");
                navigate('/admin/userlist');
            })
            .catch(function (error) {
                setError(error.message);
        });
    }
    return ( 
    <>
        {error && <h2 className="text-center text-danger">{error}</h2>}
        <UserManagementForm user={{}} submitForm={handleAdd} mode="create"/>
    </> 
    );
}

const EnchancedComponent = withHoc('Create Employee Profile',CreateTrainingUsers)
export default EnchancedComponent;
