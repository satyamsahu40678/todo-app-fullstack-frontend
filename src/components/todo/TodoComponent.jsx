import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment";

export default function TodoComponent() {

    const { id } = useParams();
    const authContext = useAuth();
    const username = authContext.username;
    const [description, setDescription] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const navigate = useNavigate();



    useEffect(
        () => retrieveTodo(),
        [id]
    )

    function retrieveTodo() {
        if (id != -1) {
            retrieveTodoApi(username, id)
                .then((response) => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
                .catch((error) => console.log(error));
        }

    }

    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id == -1) {
            createTodoApi(username, todo)
                .then((response) => navigate('/todos'))
                .catch((error) => console.log(error));
        }
        else {
            updateTodoApi(username, id, todo)
                .then((response) => navigate('/todos'))
                .catch((error) => console.log(error));
        }

    }

    function validate(values) {
        let errors = {
            // description: 'Enter Valid Description',
            // targetDate: 'Enter Valid Target Date'
        };

        if (values.description.length < 5) {
            errors.description = 'Enter Atleast 5 Characters';
        }
        if (values.targetDate.length === null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter Valid Target Date';
        }
        return errors;
    }


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Enter Todo Details</h1>
                        </div>
                        <div className="card-body">
                            <Formik
                                initialValues={{ description, targetDate }}
                                enableReinitialize={true}
                                onSubmit={onSubmit}
                                validate={validate}
                                validateOnBlur={false}
                                validateOnChange={false}
                            >
                                {props => (
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="description">Description:</label>
                                            <Field type="text" className="form-control" id="description" name="description" />
                                            <ErrorMessage name="description" component="div" className="alert alert-danger mt-2" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="targetDate">Target Date:</label>
                                            <Field type="date" className="form-control" id="targetDate" name="targetDate" />
                                            <ErrorMessage name="targetDate" component="div" className="alert alert-danger mt-2" />
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-success mt-4" type="submit">Submit</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}