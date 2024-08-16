'use client'
import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import * as Yup from 'yup'
import axios from '@/lib/axios'
import { makeFormData } from '@/utils/helper'
import { Formik } from 'formik'

export default function CreateAppServiceAccount() {
    return (
        // eslint-disable-next-line react/jsx-filename-extension
        <Formik
            initialValues={{
                service_name: '',
                service_description: '',
                homepage_url: '',
                callback_url: '',
                webhook_url: '',
            }}
            validationSchema={Yup.object().shape({
                service_name: Yup.string()
                    .max(200)
                    .required('Service Name is required'),
                service_description: Yup.string()
                    .max(500)
                    .required('Service Description is required'),
                homepage_url: Yup.string()
                    .max(300)
                    .required('Homepage URL is required'),
                callback_url: Yup.string()
                    .max(300)
                    .required('Callback URL is required'),
                webhook_url: Yup.string()
                    .max(300)
                    .required('Webhook URL is required'),
            })}
            onSubmit={async (values, { resetForm }) => {
                try {
                    await axios
                        .post(
                            '/api/save-service',
                            makeFormData([
                                {
                                    key: 'service_name',
                                    value: values.service_name,
                                },
                                {
                                    key: 'service_description',
                                    value: values.service_description,
                                },
                                {
                                    key: 'homepage_url',
                                    value: values.homepage_url,
                                },
                                {
                                    key: 'callback_url',
                                    value: values.callback_url,
                                },
                                {
                                    key: 'webhook_url',
                                    value: values.webhook_url,
                                },
                            ]),
                        )
                        .then(response => {
                            if (response.data.success) {
                                resetForm()
                                setSnackbar({
                                    open: true,
                                    message: response.data.msg,
                                    alert: 'success',
                                })
                                setTimeout(() => {
                                    window.location.reload()
                                }, 1500)
                            }
                        })
                } catch (error) {
                    if (error.response.data) {
                        setSnackbar({
                            open: true,
                            message: error.response.data.data,
                            alert: 'error',
                        })
                    }
                }
            }}>
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
            }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="service_name"
                                value="Service Name"
                            />
                        </div>
                        <TextInput
                            id="service_name"
                            name="service_name"
                            placeholder="service-name"
                            required
                            type="text"
                            value={values.service_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            helperText={
                                touched.service_name && errors.service_name
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="service_description"
                                value="Service Description"
                            />
                        </div>
                        <Textarea
                            id="service_description"
                            name="service_description"
                            placeholder="write description"
                            required
                            value={values.service_description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            helperText={
                                touched.service_description &&
                                errors.service_description
                            }
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="homepage_url"
                                value="Homepage URL"
                            />
                        </div>
                        <TextInput
                            id="homepage_url"
                            name="homepage_url"
                            placeholder="my-application-home-page.com"
                            required
                            type="text"
                            value={values.homepage_url}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            helperText={
                                touched.homepage_url && errors.homepage_url
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="callback_url"
                                value="Callback URL"
                            />
                        </div>
                        <TextInput
                            id="callback_url"
                            name="callback_url"
                            placeholder="my-application-call-back-url"
                            required
                            type="text"
                            value={values.callback_url}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            helperText={
                                touched.callback_url && errors.callback_url
                            }
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="webhook_url" value="Web hook URL" />
                        </div>
                        <TextInput
                            id="webhook_url"
                            name="webhook_url"
                            placeholder="my-application-web-hook-url"
                            required
                            type="text"
                            value={values.webhook_url}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            helperText={
                                touched.webhook_url && errors.webhook_url
                            }
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            )}
        </Formik>
    )
}
