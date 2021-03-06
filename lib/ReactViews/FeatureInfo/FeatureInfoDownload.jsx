import React from 'react';

import FeatureDetection from 'terriajs-cesium/Source/Core/FeatureDetection';

import DataUri from '../../Core/DataUri';
import Dropdown from '../Generic/Dropdown';
import Icon from '../Icon.jsx';

import Styles from './feature-info-download.scss';

const FeatureInfoDownload = React.createClass({
    propTypes: {
        data: React.PropTypes.object.isRequired,
        name: React.PropTypes.string.isRequired,
        viewState: React.PropTypes.object.isRequired,
        canUseDataUri: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            canUseDataUri: !(FeatureDetection.isInternetExplorer() || (/Edge/).exec(navigator.userAgent))
        };
    },

    getLinks() {
        return [
            {
                href: DataUri.make('csv', generateCsvData(this.props.data)),
                download: `${this.props.name}.csv`,
                label: 'CSV'
            },
            {
                href: DataUri.make('json', JSON.stringify(this.props.data)),
                download: `${this.props.name}.json`,
                label: 'JSON'
            }
        ].filter(download => !!download.href);
    },

    render() {
        const links = this.getLinks();

        if (DataUri.checkCompatibility()) {
            return (
                <Dropdown options={links}
                          textProperty="label"
                          theme={{dropdown: Styles.download, list: Styles.dropdownList, button: Styles.dropdownButton}}
                          buttonClassName={Styles.btn}>
                    <span className={Styles.iconDownload}><Icon glyph={Icon.GLYPHS.download}/></span> Download this Table&nbsp;▾
                </Dropdown>
            );
        } else {
            return null;
        }
    }
});

/**
 * Turns a 2-dimensional javascript object into a CSV string, with the first row being the property names and the second
 * row being the data. If the object is too hierarchical to be made into a CSV, returns undefined.
 */
function generateCsvData(data) {
    if (!data) {
        return;
    }

    const row1 = [];
    const row2 = [];
    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const type = typeof data[key];

        // If data is too hierarchical to fit in a table, just return undefined as we can't generate a CSV.
        if (type === 'object' && data[key] !== null) { // covers both objects and arrays.
            return;
        }
        if (type === 'function') {
            // Ignore template functions we may add.
            continue;
        }

        row1.push(makeSafeForCsv(key));
        row2.push(makeSafeForCsv(data[key]));
    }

    return row1.join(',') + '\n' + row2.join(',');
}

/**
 * Makes a string safe for insertion into a CSV by wrapping it in inverted commas (") and changing inverted commas within
 * it to double-inverted-commas ("") as per CSV convention.
 */
function makeSafeForCsv(value) {
    value = value ? `${value}` : '';

    return '"' + value.replace(/"/g, '""') + '"';
}

export default FeatureInfoDownload;
