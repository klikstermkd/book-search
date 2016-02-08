import React from 'react';

const bookStyle = {
  marginTop: 30,
  position: 'relative',
  overflow: 'hidden',
  height: 274,
  marginLeft: 100,
  marginRight: 100
};

const metaInfoStyle = {
  position: 'absolute',
  top: 57,
  left: 150
};

const Book = ({info}) => (
  <div style={bookStyle}>
    <a href={info.infoLink} target="_new"><h3 style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>{info.title}</h3></a>
    <a href={info.infoLink} target="_new"><img src={info.thumbnail} width="128" height="193" /></a>
    <div style={metaInfoStyle}>
      <span style={{color: '#006621', fontWeight: 'bold'}}>Authors:</span> {info.authors.map((author, i) => {
        return <span key={i} style={{color: '#006621'}}>{author}{i < (info.authors.length - 1) && ', '}</span>
      })}
      <p>{info.description}</p>
    </div>
  </div>
);

Book.propTypes = {
  info: React.PropTypes.shape({
    title: React.PropTypes.string.isRequired,
    infoLink: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
  }).isRequired
};

export default Book;