import React, {useState, useEffect} from 'react'
import FormInput from './FormInput';
import PropTypes from 'prop-types';


const BmiCalculator = props => {
    const { getBmiValue } = props;
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
        imperialBMI(heightCount, weightCount, inchesCount);
        //eslint-disable-next-line
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
            setHeightUnit('cm');
            setWeightUnit('kg');
        } else {
            setHeightUnit('ft');
            setWeightUnit('lbs');
        }
    }

    const metricBMI = (height, weight) => {
        if(height > 0 && weight > 0){
            const heightToMeter = height / 100;
            const bmi = weight / (heightToMeter * heightToMeter);
            getBmiValue(Math.round(bmi));
        }
    }
    const imperialBMI = (height, weight, inches) => {
        if(height > 0 && weight > 0){
            //12 inches = 1 foot
            //convert feet to inches
            const inchTotal = (height * 12) + parseInt(inches);
            const bmi = 703*(weight / (inchTotal * inchTotal))
            getBmiValue(Math.round(bmi));
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
        getBmiValue(0);
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
BmiCalculator.propTypes = {
    getBmiValue: PropTypes.func.isRequired
}
export default BmiCalculator;
