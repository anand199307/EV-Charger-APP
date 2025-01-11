import React from 'react'
import Header from '../../../components/common/Header';
import TransactionTable from './TransactionTable';

const Transactions = () => {
  return (
    <div>
      <div>
        <Header
          title="Transactions"
          para="Manage the Transaction of your HELIOS App"
        />
      </div>
      <div>
        <TransactionTable />
      </div>
    </div>
  );
}

export default Transactions