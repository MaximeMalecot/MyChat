import React from 'react';
import classes from './analytic-item.module.scss';

export default function AnalyticItem({data}){
    return(
        <div className={classes.main}>

            <div className={classes.route}>
                <span>{data._id}</span>
            </div>
            <div className={classes.actions}>
                <p>Total actions {data.count}</p>
                {data.actions.length > 0
                    ?  
                    <>
                        <p>Last actions:</p>
                        <div className={classes.actionsList}>
                                {(data.actions).slice(0, 3).map(({action, count}, index) => <span key={index}>{action} ({count} times)</span>)}
                                {/* {data.actions.map((action, index) => <span key={index}>{JSON.stringify(action.action)}</span>)} */}

                        </div>
                    </>
                    : <p>No data yet</p>
            }
            </div>
        </div>
    )
}