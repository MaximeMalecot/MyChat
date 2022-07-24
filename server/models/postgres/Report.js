// Report model
const { Model, DataTypes } = require("sequelize");
const connection = require("./db");
const { REPORT_STATUS, REPORT_TYPES} = require("../../constants/enums");

class Report extends Model {}

Report.init(
    {
        status: {
            type: DataTypes.ENUM(Object.keys(REPORT_STATUS)),
            allowNull: false,
            defaultValue: REPORT_STATUS.CREATED,
        },
        type: {
            type: DataTypes.ENUM(Object.keys(REPORT_TYPES)),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
			validate: {
				notEmpty: true,
			},
        },
    },
    {
        sequelize: connection,
        modelName: "report",
    }
);

module.exports = Report;
