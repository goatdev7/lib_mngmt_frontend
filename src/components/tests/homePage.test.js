import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";

// render component with react router
const renderwWithRouter = (ui) =>{
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Homepage Components Tests', () => {
    // clearing local storage before each test
    // we use beforeEach to reduce the duplicate code
    beforeEach(()=>{
        localStorage.clear();
    });

    // test # 1
    test('render homepage button when not logged in', ()=> {
        renderwWithRouter(<HomePage />);

        // checking if login/register buttons are present
        expect(screen.getByText(/login/i)).toBeInTheDocument();
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });

});