'use strict';

const React = require('react');
const DataCatalogTab = require('./DataCatalogTab.jsx');
const MyDataTab = require('./MyDataTab.jsx');
const WelcomeTab = require('./WelcomeTab.jsx');

function getName(str1, str2) {
  return str1.concat(str2);
}

const items = ['welcome', 'data-catalog', 'my-data'];

const Tabs = React.createClass({
  propTypes: {
    terria: React.PropTypes.object,
    activeTab: React.PropTypes.number
  },

  getInitialState() {
    return {
      activeTab: this.props.activeTab
    };
  },

  clickTab(i) {
    this.setState({
      activeTab: i
    });
  },

  componentWillReceiveProps() {
      // This doesn't work
  },

  render() {
    const panels = [<WelcomeTab terria= {this.props.terria} />, <DataCatalogTab terria={this.props.terria}/>, <MyDataTab terria={this.props.terria}/>];
    return (
        <div className="tabs clearfix">
          <ul className="tablist list-reset flex" role="tablist">
          {items.map((item, i)=>{
            return (<li key={i} className={getName('tablist__', item)} id={getName('tablist__', item)} role="tab" aria-controls={getName('panel__', item)} aria-selected={(this.state.activeTab === i) ? 'true' : 'false'} ><button onClick={this.clickTab.bind(this, i)} className='btn btn-tab'>{item.replace(/-/g, ' ')}</button></li>);
          }, this)}
          </ul>

          {items.map((item, i)=>{
            return (
              <section key={i} aria-hidden={(this.state.activeTab === i) ? 'false' : 'true'} id={getName('panel__', item)} className={getName('tab-panel panel__', item)} aria-labelledby={getName('tablist__', item)} role='tabpanel' tabIndex='0'>
              <h3 className="hide">{item.replace(/-/g, ' ')}</h3>
                {panels[i]}
              </section>
              );
          }, this)}
          </div>);
  }
});
module.exports = Tabs;