import ProductCard from "../components/ProductCard"
import {render, screen, waitFor} from "@testing-library/react"
import axios from "axios"

jest.mock("axios")

const axiosResponseMock = {
    data:{ 
        title: 'Macbook Pro', 
        description: 'Mackbook Pro Professional', 
        price: 1000, 
        thumbnail: 'http://img.png',
    }
}
describe("Product Card",()=>{

    test("Renderizar card", async()=>{
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        render(<ProductCard/>)
        screen.debug()
        await waitFor(()=>{})
        screen.debug()
    })

    test("Renderizar inicialmente o loading", async()=>{
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        render(<ProductCard/>)
        
        const loading = screen.getByText(/loading\.\.\./i)

        expect(loading).toBeInTheDocument()

        expect(screen.queryByText(/macBook Pro/i)).not.toBeInTheDocument()
        await waitFor(()=>{})
        screen.debug()
    })

    test("renderiza o card corretamente após carregamento", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)
        
        render(<ProductCard />)

        await waitFor(() => {
            const title = screen.getByRole('heading', {
                name: /macbook pro/i
            })

            expect(title).toBeInTheDocument()

            expect(
                screen.getByRole('img', {
                    name: /thumbnail for macbook pro/i
                }))
            })
    })
        
})