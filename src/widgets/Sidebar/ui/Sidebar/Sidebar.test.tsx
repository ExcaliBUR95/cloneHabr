import {  fireEvent, screen } from "@testing-library/react";

import renderWithTranslation from "shared/lib/test/renderWithTranslation/renderWithTranslation";
import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  test("Test sidebar", () => {

    renderWithTranslation(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
});
    test('Test sidebar toggle', () => {
        renderWithTranslation(<Sidebar />)
        const toggle = screen.getByTestId('sidebar-toggle')
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        fireEvent.click(toggle)
        expect(expect(screen.getByTestId('sidebar')).toHaveClass('collapsed'))
    })
  
});
