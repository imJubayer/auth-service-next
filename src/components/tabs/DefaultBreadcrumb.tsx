'use client'

import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'

export default function DefaultBreadcrumb() {
    return (
        <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item href="#" icon={HiHome}>
                <p>App Service Manager</p>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Service Registration</Breadcrumb.Item>
        </Breadcrumb>
    )
}
