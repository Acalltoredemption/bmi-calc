import React, {useState} from 'react'
import FormInput from './FormInput'


export default function BmiCalculator() {
    const [heightUnit, setHeightUnit] = useState('');
    const [weightUnit, setWeightUnit] = useState('');
    const [unit, setUnit] = useState('');

    const onChangeInput = e => {
    }
    const onSelectTag = e => {
        setUnit(e.target.value);
        if (e.target.value === 'Metric'){
            setHeightUnit('cm');
            setWeightUnit('kg');
        } else {
            setHeightUnit('ft');
            setWeightUnit('lbs');
        }
    }
    return (
        <>
        <div className="bmi-inputs">
            <div className="inputs-fields">
                <div>
                    <span className="label-unit">Unit</span>
                    <div className="unit">
                        <select
                         name="unit"
                          value={unit}
                          className="form-control form-control-sm"
                          onChange={onSelectTag}
                          >
                            <option value="Metric">Metric</option>
                            <option value="Imperial">Imperial</option>
                        </select>
                    </div>
                </div>
                <FormInput 
                type="text"
                name="heightCount"
                title={`Height(${heightUnit})`}
                value=""
                onChange={onChangeInput}
                />
                {
                    unit === 'Imperial' ? 
                    <FormInput 
                    type="text"
                    name="inchesCount"
                    title={`(in)`}
                    value=""
                    onChange={onChangeInput}
                    /> : ' '
                }

                                <FormInput 
                type="text"
                name="weightCount"
                title={`Weight(${weightUnit})`}
                value=""
                onChange={onChangeInput}
                />
            </div>
            <button className="button" type="submit">
                Reset
            </button>
        </div>
        </>
    )
}
