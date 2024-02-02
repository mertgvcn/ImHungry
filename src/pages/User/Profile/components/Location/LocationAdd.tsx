import React, { useContext, useState } from 'react'
import { ChangeContext } from '../../../../../context/ChangeContext'
//exported functions
import { AddLocation } from '../../../../../setup/API/location_api'
import { usePopAlert } from '../../../../../hooks/usePopAlert'
//css
import './styles/LocationAdd.css'
//components
import Alert from '../../../../../components/Shared/Alert'
//models
import { AddLocationRequest } from '../../../../../models/ParameterModels/LocationParameterModels'


type propsType = {
    trigger: boolean,
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>
}

const LocationAdd = (props: propsType) => {
    //Context
    const { locationToggle, setLocationToggle } = useContext(ChangeContext)

    //Add Location States
    const [formData, setFormData] = useState({
        title: "",
        province: "",
        district: "",
        neighbourhood: "",
        street: "",
        buildingNo: "",
        buildingAddition: "",
        apartmentNo: "",
        note: ""
    })
    const [errors, setErrors] = useState<any>({})
    const {alertStates, popAlert} = usePopAlert()


    //Functions
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFormData({
            ...formData, [name]: value
        })
    }

    const handleAdd = async () => {
        if (Validation()) {
            try {
                const addLocationRequest: AddLocationRequest = {
                    LocationTitle: formData.title,
                    Province: formData.province,
                    District: formData.district,
                    Neighbourhood: formData.neighbourhood,
                    Street: formData.street,
                    BuildingNo: formData.buildingNo,
                    BuildingAddition: formData.buildingAddition,
                    ApartmentNo: formData.apartmentNo,
                    Note: formData.note
                }

                await AddLocation(addLocationRequest)
                popAlert("green", "Addrees successfuly added")
                setLocationToggle(!locationToggle)
                resetInputs()
                setTimeout(() => {
                    props.setTrigger(false)
                }, 2000)
            } catch (error) {
                popAlert("red", "Address could not be added")
            }
        }
    }


    //Support functions
    const Validation = () => {
        let isValid = true
        const validationErrors: any = {}

        //title
        if (!formData.title.trim()) {
            validationErrors.title = "*Required"
        }
        else if (formData.title.length > 25) {
            validationErrors.title = "Title can contain up to 25 characters"
        }

        //province
        if (!formData.province.trim()) {
            validationErrors.province = "*Required"
        }
        else if (formData.province.length > 25) {
            validationErrors.province = "Province can contain up to 25 characters"
        }

        //district
        if (!formData.district.trim()) {
            validationErrors.district = "*Required"
        }
        else if (formData.district.length > 25) {
            validationErrors.district = "District can contain up to 25 characters"
        }

        //neighbourhood
        if (!formData.neighbourhood.trim()) {
            validationErrors.neighbourhood = "*Required"
        }
        else if (formData.neighbourhood.length > 35) {
            validationErrors.neighbourhood = "Neighbourhood can contain up to 35 characters"
        }

        //street
        if (formData.street.length > 25) {
            validationErrors.street = "*Street can contain up to 25 characters"
        }

        //building no
        if (formData.buildingNo.length > 10) {
            validationErrors.buildingNo = "*Building number can contain up to 10 characters"
        }

        //building addition
        if (formData.buildingAddition.length > 10) {
            validationErrors.buildingAddition = "*Building addition can contain up to 10 characters"
        }

        //apartment no
        if (formData.apartmentNo.length > 10) {
            validationErrors.apartmentNo = "*Apartment number can contain up to 10 characters"
        }

        //note
        if (formData.note.length > 50) {
            validationErrors.note = "*Note can contain up to 50 characters"
        }

        if (Object.keys(validationErrors).length != 0) {
            isValid = false
            setErrors(validationErrors)
        }

        return isValid
    }

    const resetInputs = () => {
        setErrors({})
        setFormData({
            title: "",
            province: "",
            district: "",
            neighbourhood: "",
            street: "",
            buildingNo: "",
            buildingAddition: "",
            apartmentNo: "",
            note: ""
        })
    }


    return props.trigger ? (
        <div className='add-address-background'>
            <div className='add-address-wrapper'>

                <div className="close-add-address">
                    <i className="fa-solid fa-x" onClick={() => {
                        resetInputs();
                        props.setTrigger(false);
                    }}></i>
                </div>

                <p>Add Address</p>

                <div className='input-group'>
                    <p>Title</p>
                    <input name="title" type="text" onChange={handleChange} />
                    <div>
                        {errors.title && <span>{errors.title}</span>}
                    </div>
                </div>
                <div className='input-group'>
                    <p>Province</p>
                    <input name="province" type="text" onChange={handleChange} />
                    <div>
                        {errors.province && <span>{errors.province}</span>}
                    </div>
                </div>
                <div className="input-group">
                    <p>District</p>
                    <input name="district" type="text" onChange={handleChange} />
                    <div>
                        {errors.district && <span>{errors.district}</span>}
                    </div>
                </div>
                <div className='input-group'>
                    <p>Neighbourhood</p>
                    <input name="neighbourhood" type="text" onChange={handleChange} />
                    <div>
                        {errors.neighbourhood && <span>{errors.neighbourhood}</span>}
                    </div>
                </div>
                <div className='input-group'>
                    <p>Street</p>
                    <input name="street" type="text" onChange={handleChange} />
                    <div>
                        {errors.street && <span>{errors.street}</span>}
                    </div>
                </div>

                <div className="row">
                    <div className='building-info'>
                        <div className='input-group'>
                            <p>Building Number</p>
                            <input name="buildingNo" type="text" onChange={handleChange} />
                            <div>
                                {errors.buildingNo && <span>{errors.buildingNo}</span>}
                            </div>
                        </div>
                        <div className='input-group'>
                            <p>Building Addition</p>
                            <input name="buildingAddition" type="text" onChange={handleChange} />
                            <div>
                                {errors.buildingAddition && <span>{errors.buildingAddition}</span>}
                            </div>
                        </div>
                    </div>

                    <div className='input-group'>
                        <p>Apartment Number</p>
                        <input name="apartmentNo" type="text" onChange={handleChange} />
                        <div>
                            {errors.apartmentNo && <span>{errors.apartmentNo}</span>}
                        </div>
                    </div>
                </div>
                <div className="input-group">
                    <p>Note</p>
                    <textarea name="note" rows={3} onChange={handleChange} />
                    <div>
                        {errors.note && <span>{errors.note}</span>}
                    </div>
                </div>

                <button className='address-add' onClick={handleAdd}>Add</button>
            </div >

            <Alert isOpen={alertStates.isOpen} color={alertStates.color} msg={alertStates.msg} />
        </div>
    ) : null
}

export default LocationAdd