import '../styles/GigView.scss';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';

// components //
import ApplyModal from '../../components/JobSearch/ApplyModal';

// react-router //
import {useParams} from 'react-router-dom';

// context //
import {UserContext} from '../../Providers/userProvider';

// mui //
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles({
  back_btn: {
    color: '#182c5b',
    'border-color': '#182c5b',
  },
});

export default function GigView(props) {
  const {currentUser, savedJobsGigs, setSavedJobsGigs} =
    useContext(UserContext);
  const {gigs} = savedJobsGigs;
  const {gig_id} = useParams();
  const [gigPosting, setGigPosting] = useState('');
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (gigs) {
      gigs.filter(gig => gig.gig_posting_id === +gig_id).length &&
        setSaved(true);
    }
  }, [gigs]);

  useEffect(() => {
    axios
      .get(`/api/gig_postings/${gig_id}`)
      .then(res => {
        console.log(res.data);
        setGigPosting(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const saveGig = () => {
    if (saved) {
      return navigate('/profile');
    }

    axios
      .post('/api/save/', {
        devId: currentUser.id,
        jobGigId: +gig_id,
        jobType: 'gig',
      })
      .then(res => {
        console.log(res.data);
        setSaved(true);
        setSavedJobsGigs(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="content-container page-container">
      <div className="gig-content">
        <div id="back-btn">
          <Button
            variant="outlined"
            className={classes.back_btn}
            onClick={() => navigate(-1)}
          >
            Back To Search
          </Button>
        </div>
        <h1 id="gig-jobtitle">{gigPosting.job_title}</h1>
        <p>
          <em>Posted on January 30, 2022</em>
        </p>
        <div className="gig-img-container">
          {gigPosting &&
            gigPosting.gig_images.map((image, index) => (
              <img key={index} src={image.photo_url} className="gig-img" />
            ))}
        </div>
        <div id="gig-bottom-content">
          <h2 id="gig-desc-label">Description</h2>
          <p className="gig-desc">{gigPosting.description}</p>
          <p>
            <b>Offer: {`$${gigPosting.pay / 100} CAD`} </b>
          </p>
          <p>
            <b>
              Deadline:{' '}
              {new Date(gigPosting.deadline).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
            </b>
          </p>
          <div className="posting-btn-container">
            <ApplyModal currentUser={currentUser} jobApplying={gigPosting} />
            <Button
              variant={saved ? 'contained' : 'outlined'}
              color={saved ? 'success' : 'primary'}
              onClick={saveGig}
            >
              {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}{' '}
              {saved ? 'SAVED' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
