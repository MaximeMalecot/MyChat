import React from 'react';
import classes from './analytic-item-full.module.scss';

export default function AnalyticItemFull({data}){
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
                        <p>Detail:</p>
                        <div className={classes.actionsList}>
                                {data.actions.map(({action, count}, index) => <span key={index}>{action} ({count} times)</span>)}
                        </div>
                    </>
                    : <p>No data yet</p>
            }
            </div>
        </div>
    )
}