import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../list';
import Button from '../button';

class PaginatedList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
    };

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  nextPage() {
    const currentPage = this.state.currentPage;
    const nextPage = currentPage + 1;

    if (nextPage >= this.props.list.length) return;

    this.setState({ currentPage: nextPage });
  }

  prevPage() {
    const currentPage = this.state.currentPage;
    const prevPage = this.state.currentPage - 1;

    if (currentPage <= 0) return;

    this.setState({ currentPage: prevPage });
  }

  render() {
    const { currentPage } = this.state;
    const { list, children } = this.props;
    const hasNextPage = currentPage < list.length - 1;
    const hasPrevPage = currentPage > 0;

    return (
      list.length > 0 && (
        <div>
          <List items={list[currentPage]}>{children}</List>
          <Button disabled={!hasPrevPage} onClick={this.prevPage} text="<" />
          <Button disabled={!hasNextPage} onClick={this.nextPage} text=">" />
        </div>
      )
    );
  }
}

PaginatedList.defaultProps = {
  list: [],
};

PaginatedList.propTypes = {
  list: PropTypes.arrayOf(Object),
  children: PropTypes.node.isRequired,
};

export default PaginatedList;
