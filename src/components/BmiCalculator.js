import React, {useState, useEffect} from 'react'
import FormInput from './FormInput'


export default function BmiCalculator() {
    const [heightUnit, setHeightUnit] = useState('cm');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [unit, setUnit] = useState('Metric');
     const [count, setCount] = useState({
        heightCount: '0',
        weightCount: '0',
        inchesCount: '0'
    });
    // const [count, setCount] = useState({
    //     data: {
    //     heightCount: '0',
    //     weightCount: '0',
    //     inchesCount: '0'
    //     }
    // });


    const {heightCount, inchesCount, weightCount} = count;

     useEffect(() => {
        metricBMI(heightCount, weightCount);
     }, [heightCount, weightCount]);

    const onChangeInput = e => {
        const {name, value} = e.target;
        // setCount({
        //     data: {
        //         ...data,
        //     [name]: value
        //     }
        // });
        setCount(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const onSelectTag = e => {
        setUnit(e.target.value);
        if (e.target.value === 'Metric'){
            setHeightUnit('m');
            setWeightUnit('kg');
        } else {
            setHeightUnit('ft');
            setWeightUnit('lbs');
        }
    }

    const metricBMI = (height, weight) => {
        if(height > 0 && weight > 0){
            const bmi = weight / (height * height);
        }
    }

    const resetData = e => {
        e.preventDefault();
        setUnit('Metric');
        setCount({
            heightCount: '0',
            weightCount: '0',
            inchesCount: '0'
        });
        setHeightUnit('cm');
        setWeightUnit('kg');
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
                value={heightCount}
                onChange={onChangeInput}
                />
                {
                    unit === 'Imperial' ? 
                    <FormInput 
                    type="text"
                    name="inchesCount"
                    title={`(in)`}
                    value={inchesCount}
                    onChange={onChangeInput}
                    /> : ' '
                }

                                <FormInput 
                type="text"
                name="weightCount"
                title={`Weight(${weightUnit})`}
                value={weightCount}
                onChange={onChangeInput}
                />
            </div>
            <button className="button" onClick={resetData} type="submit">
                Reset
            </button>
        </div>
        </>
    )
}
