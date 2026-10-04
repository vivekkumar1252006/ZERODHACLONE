import React from 'react';

function EmptyTabState({ activeTab, onReturn }) {
  return (
    <section className='empty-tab panel'>
      <div className='empty-tab-icon'>▦</div>
      <h2>{activeTab}</h2>
      <p>Your {activeTab.toLowerCase()} will appear here. Use the dashboard to monitor your portfolio and markets.</p>
      <button type='button' onClick={onReturn} className='primary-button'>Back to dashboard</button>
    </section>
  );
}

export default EmptyTabState;
