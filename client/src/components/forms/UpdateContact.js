import { useMutation } from "@apollo/client"
import { Form, Input, Button } from "antd"
import { useEffect, useState } from "react"
import { UPDATE_CONTACT } from "../../queries"


const UpdateContact = props => {
    const [form] = Form.useForm()
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [, forceUpdate] = useState()

    const [updateContact] = useMutation(UPDATE_CONTACT)

    useEffect(() => {
        forceUpdate()
    }, [])
    

    const onFinish = values => {
        const {firstName, lastName} = values
        updateContact({
            variables: {
                id, firstName, lastName
            }
        })
        props.onButtonClick()
    }

    return(
        <Form
            form={form}
            name='update-contact-form'
            layout='inline'
            size='large'
            onFinish={onFinish}
            initialValues={{
                firstName: props.firstName,
                lastName: props.lastName
            }}
        >
            <Form.Item
                name='firstName'
                rules={[{
                    required: true,
                    message: 'Please input your first name!'
                }]}
            >
                <Input 
                    placeholder="i.e. John"
                />
            </Form.Item>
            <Form.Item
                name='lastName'
                rules={[{
                    required: true,
                    message: 'Please input your last name!'
                }]}
            >
                <Input 
                    placeholder="i.e. Smith"
                />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                        (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                        form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Contact
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateContact
