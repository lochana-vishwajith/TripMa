import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/loginPage/login";
import ReviewHome from "./components/ReviewsHome/ReviewsHome";
import IndividualReview from "./components/IndividualReview/IndividualReview";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CustomerDetails from "./components/IndividualReview/CustomerDetails";
import AttractionStatus from "./components/AttractionStatus/AttractionStatus";
import AdminLandingPage from "./components/AdminLandingPage/AdminLandingPage";
import AdminSafetyDashboard from "./components/AdminSafetyDashboard/AdminSafetyDashboard";
import ViewUnresolvedIssuesList from "./components/ViewUnresolvedIssuesList/ViewUnresolvedIssuesList";
import AddSuggestionToIssues from "./components/AddSuggestionToIssues/AddSuggestionToIssues";
import ViewIssues from "./components/ViewIssues";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route exact path="/reviews" element={<ReviewHome />} />
          <Route
            exact
            path="/individual-review"
            element={<IndividualReview />}
          />
          <Route exact path="/customer-details" element={<CustomerDetails />} />
          <Route exact path="/attraction-status" element={<AttractionStatus />} />
          <Route exact path="/admin-landing" element={<AdminLandingPage />} />
          <Route
            exact
            path="/adminSafety-suggestions"
            element={<AdminSafetyDashboard />}
          />
          <Route
            exact
            path="/unresolvedissueList"
            element={<ViewUnresolvedIssuesList />}
          />

          <Route
            exact
            path="/addsuggestionstoissues/:id"
            element={<AddSuggestionToIssues />}
          />

          <Route exact path="/issuesList" element={<ViewIssues />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
