import { ActionButton } from "components/button/Button";
import { Footer } from "components/Footer";
import { LoadingIndicator } from "components/LoadingIndicator";
import { Logo } from "components/Logo";
import { Header, MutedText } from "components/typography/Typography";
import { useSlotBookMutation } from "hooks/slots/useSlotBookMutation";
import { useEffect } from "react";
import { FiAlertTriangle, FiCheck } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function ConfirmSchedule() {
    const { eventId, slotId } = useParams();
    const bookMutation = useSlotBookMutation();
    const navigate = useNavigate();

    const bookSlot = () => {
        bookMutation.mutate({ slotId: Number(slotId), eventId: Number(eventId) });
    }

    useEffect(() => {
        if (bookMutation.isSuccess) {
            navigate("/slot/scheduled", { state: { slotId: bookMutation.variables } });
        }
    }, [bookMutation.isSuccess]);

    useEffect(() => {
        if (bookMutation.isError) {
            navigate(`/event/${eventId}/slots`, { state: { hasError: true } });
        }
    }, [bookMutation.isError]);

    if (bookMutation.isLoading) {
        return (
            <LoadingIndicator />
        )
    }

    return (
        <div className="container flex flex-col min-h-screen">
            <div className="mt-10 md:mt-14">
                <Logo />
            </div>
            <div className="flex xl:items-center">
                <div className="md:flex-[1_0_36rem] w-full 2xl-height:pt-[4.5rem] self-start">
                    <div className="flex flex-col items-center md:items-start">
                        <Header textSize="text-2xl md:text-3xl">Tem certeza que quer agendar o voo?</Header>
                        <div className="mt-7 lg:pr-1.5">
                            <MutedText textSize="text-[1.37rem]">
                                Antes de confirmar o agendamento, verifique com atenção todos os detalhes do voo e se ele é o voo desejado.
                            </MutedText>
                        </div>
                        <div className="mx-auto md:mx-0 mt-24 md:mt-12 w-full">
                            <div className="flex">
                                <div className="bg-orange px-5 py-7 rounded-l-lg text-white">
                                    <FiAlertTriangle size={43} />
                                </div>
                                <p className="bg-brown/10 text-orange dark:text-white py-2 pl-4 pr-3 rounded-r-lg text-sm">
                                    Agendar não significa que a reserva foi confirmada, mas que o status do seu voo constará como <b><i>scheduled</i></b>.
                                    Você deverá confirmar a reserva entre <b>sete</b> e <b>três dias</b> antes da data do evento – seu agendamento será <b>cancelado</b> se você
                                    não confirmar o voo até 72 horas antes do horário do voo.
                                </p>
                            </div>

                            <div className='flex flex-col mt-12 md:flex-row space-y-4 md:space-y-0'>
                                <div className='flex-1'>
                                    <ActionButton
                                        content='Confirmar reserva'
                                        icon={<FiCheck size={20} />}
                                        width='w-full'
                                        onClick={() => bookSlot()} />
                                </div>
                                <div className='flex-1'>
                                    <ActionButton
                                        backgroundFilled={false}
                                        width='w-full'
                                        content="Voltar"
                                        onClick={() => navigate(-1)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden xl:block w-full max-w-[28rem] 2xl-height:max-w-130 mx-auto">
                <svg width="470" height="466" viewBox="0 0 470 466" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M441.651 233.436C441.72 276.326 427.914 318.125 402.229 352.784C381.471 380.89 353.728 403.287 321.655 417.832C289.581 432.377 254.25 438.583 219.041 435.858C183.832 433.132 149.923 421.566 120.558 402.265C91.1922 382.964 67.3526 356.574 51.3194 325.62C35.2862 294.665 27.5957 260.182 28.9836 225.468C30.3714 190.755 40.7913 156.972 59.2463 127.352C77.7014 97.7319 103.574 73.2651 134.39 56.2922C165.206 39.3192 199.934 30.4079 235.251 30.4106C240.915 30.4106 246.521 30.6336 252.069 31.0796C284.045 33.5921 314.975 43.4526 342.37 59.8678C372.688 77.9668 397.751 103.447 415.142 133.85C432.532 164.253 441.662 198.551 441.651 233.436Z" fill="#0D2C99"/>
<path opacity="0.5" d="M279.826 329.257C277.221 336.06 281.555 336.366 281.843 339.212C282.131 342.058 281.843 347.455 273.463 355.709C265.083 363.963 251.205 362.24 248.311 365.653C245.418 369.066 240.508 383.567 233.569 388.409C226.63 393.25 225.5 390.393 215.644 392.389C205.789 394.384 198.366 406.913 195.415 412.854C192.464 418.796 195.991 428.785 189.052 429.068C182.113 429.352 178.931 414.567 172.58 406.607C166.229 398.647 164.189 391.527 162.206 382.15C160.223 372.773 163.359 353.147 162.206 345.47C161.053 337.794 140.201 324.143 132.663 314.755C125.124 305.367 114.762 286.613 115.372 280.354C116.249 274.284 119.327 268.73 124.041 264.718C127.499 262.156 126.069 260.739 126.646 258.46C127.222 256.181 130.104 255.614 130.692 252.79C131.28 249.967 128.963 241.452 126.081 240.001C123.199 238.549 121.17 243.402 119.43 242.552C117.689 241.702 112.514 235.749 110.474 235.159C108.433 234.57 109.021 238.856 106.139 233.459C103.258 228.061 101.794 214.41 99.4885 212.131C97.1831 209.852 95.4426 216.111 89.9443 212.131C84.446 208.151 82.1406 200.475 79.8237 199.341C77.5068 198.208 74.3369 199.625 71.9624 195.067C69.5879 190.509 74.0488 182.277 71.9624 183.127C69.8761 183.978 65.3806 190.52 64.2164 184.261C63.0522 178.003 69.9798 156.97 68.8271 145.597C67.6744 134.225 71.7088 122.274 79.8007 112.614C79.8007 112.614 80.9534 106.355 82.106 102.41C83.2587 98.4638 108.122 82.5106 111.015 77.9526C112.168 76.0591 112.618 73.0771 113.056 69.8683C148.446 44.1926 191.277 30.3624 235.252 30.4108C240.915 30.4108 246.521 30.6338 252.069 31.0797L252.646 31.8394C255.147 34.9575 257.856 36.953 265.175 39.6062C272.495 42.2594 274.235 45.6722 272.691 48.5182C271.146 51.3641 268.645 51.9197 265.775 52.1238C262.904 52.3279 260.184 50.7858 257.106 52.6907C254.029 54.5955 250.94 64.8228 246.894 65.3897C242.848 65.9566 235.713 56.319 234.214 53.4504C232.716 50.5818 237.672 44.5384 235.367 41.6925C233.061 38.8465 228.866 39.4248 222.307 38.8465C215.748 38.2683 200.544 40.7514 201.121 43.2118C201.697 45.6722 223.471 42.8263 224.048 47.7472C224.624 52.668 208.06 61.0131 205.167 60.2194C202.273 59.4257 198.423 54.5502 194.181 53.9719C189.94 53.3937 186.47 56.8065 183.807 57.192C181.145 57.5775 178.044 54.3461 173.94 55.1058C169.837 55.8654 168.938 59.2783 166.805 60.6049C164.673 61.9315 159.682 61.9315 159.105 64.9588C158.529 67.9862 165.468 69.7096 167.174 71.6031C168.88 73.4966 165.053 79.9368 166.782 81.2634C168.511 82.59 179.312 73.3266 182.021 71.0589C184.729 68.7912 187.023 58.9381 192.81 59.1196C198.596 59.301 200.521 68.9726 202.446 69.925C204.371 70.8775 208.613 67.6574 214.964 68.9726C221.316 70.2879 225.753 83.9506 226.918 88.1231C228.082 92.2957 230.768 96.4682 228.462 98.1689C226.157 99.8697 215.783 97.0351 214.388 94.3819C212.993 91.7287 221.304 87.7376 220.751 86.7966C220.198 85.8555 215.356 84.5289 212.843 86.0029C210.331 87.4769 209.189 90.5382 206.492 91.3432C203.795 92.1483 196.66 84.1434 194.735 86.4224C192.81 88.7014 196.66 95.9013 198.585 97.602C200.51 99.3028 207.645 100.255 208.221 102.137C208.798 104.02 203.403 108.203 196.856 107.807C190.308 107.41 184.902 102.5 182.401 104.586C179.9 106.673 181.248 112.161 179.508 114.065C177.767 115.97 168.327 114.632 163.705 119.553C159.082 124.474 156.869 131.923 152.258 136.096C147.648 140.268 145.515 134.962 139.348 140.835C133.181 146.709 132.213 159.793 132.017 164.34C131.821 168.886 132.017 172.492 130.484 171.925C128.951 171.358 126.819 167.39 126.242 164.907C125.666 162.424 127.591 158.274 127.591 156.754C127.591 155.235 118.727 147.468 113.517 146.709C108.307 145.949 103.684 150.11 99.8343 153.149C95.9844 156.187 89.0452 155.621 86.5439 158.081C84.0425 160.541 82.106 182.345 84.031 187.47C85.956 192.595 88.4688 192.584 94.6357 189.93C100.803 187.277 97.333 182.152 100.999 183.298C104.664 184.443 106.578 188.23 106.578 191.234C106.578 194.239 99.258 201.439 100.226 203.559C101.194 205.68 107.546 203.174 110.6 204.126C113.655 205.079 115.211 206.972 114.266 214.739C113.321 222.506 113.886 228.583 118.508 231.134C123.13 233.685 125.735 227.438 127.729 228.3C129.723 229.161 132.651 233.697 135.544 233.413C138.438 233.13 136.985 230.567 142.461 228.878C147.936 227.188 145.919 226.032 147.071 222.619C148.224 219.206 151.682 216.36 155.451 218.084C159.221 219.807 156.604 222.347 156.892 225.193C157.18 228.039 163.808 228.322 169.041 230.023C174.275 231.724 177.11 230.023 187.484 233.425C197.859 236.826 198.469 247.031 202.804 248.777C207.138 250.523 221.592 247.643 232.001 255.035C242.41 262.428 239.517 276.08 244.681 280.059C249.845 284.039 269.256 289.436 276.771 290.865C284.287 292.293 285.439 287.168 291.514 288.597C297.589 290.026 301.047 291.727 303.041 299.935C305.012 307.226 282.419 322.431 279.826 329.257Z" fill="#2EC662"/>
<path opacity="0.3" d="M124.49 183.864C124.686 185.474 129.504 186.132 135.279 189.364C141.054 192.595 143.186 202.063 146.264 201.836C149.342 201.609 148.385 197.3 149.549 196.167C150.714 195.033 152.627 192.561 149.549 190.101C146.472 187.64 143.463 182.322 137.827 181.563C132.19 180.803 131.233 178.535 128.732 178.728C128.089 178.732 127.455 178.876 126.875 179.15C126.295 179.424 125.784 179.821 125.379 180.312C124.973 180.803 124.683 181.376 124.529 181.99C124.376 182.604 124.362 183.244 124.49 183.864Z" fill="#2EC662"/>
<path opacity="0.3" d="M156.293 199.784C155.428 202.108 156.293 203.775 162.46 205.283C168.627 206.791 174.401 203.775 172.476 202.539C170.551 201.303 167.658 201.87 168.822 199.784C169.987 197.697 169.583 194.67 164.569 195.248C159.555 195.827 157.065 197.709 156.293 199.784Z" fill="#2EC662"/>
<path opacity="0.3" d="M177.871 200.43C175.773 200.736 174.597 204.341 176.718 206.609C178.839 208.877 178.839 208.503 181.329 206.609C183.819 204.716 187.692 203.774 186.724 201.881C185.755 199.987 179.992 200.135 177.871 200.43Z" fill="#2EC662"/>
<path opacity="0.3" d="M194.643 208.185C195.588 205.339 200.406 208.185 202.538 211.167C204.671 214.149 203.691 218.56 202.538 221.78C201.386 225 200.613 228.787 197.928 227.279C195.242 225.771 198.124 221.213 197.732 218.56C197.34 215.907 193.87 210.51 194.643 208.185Z" fill="#2EC662"/>
<path opacity="0.3" d="M277.705 50.0372C276.69 52.4183 281.359 53.2573 284.056 54.7767C286.753 56.296 288.874 57.2371 290.419 54.7767C291.963 52.3162 289.842 49.459 287.722 48.892C285.601 48.3251 278.661 47.7582 277.705 50.0372Z" fill="#2EC662"/>
<path opacity="0.3" d="M314.118 72.2153C315.905 74.0521 318.936 73.7233 321.034 76.3878C323.132 79.0524 322.383 83.5877 325.08 84.9143C327.777 86.2409 329.691 84.9143 329.898 83.0208C330.106 81.1273 326.048 76.3878 326.44 75.4354C326.832 74.483 332.031 76.762 333.195 79.6079C334.359 82.4539 332.042 86.411 334.728 87.182C337.414 87.953 336.849 84.5288 338.013 83.7805C339.177 83.0321 341.667 83.395 341.471 81.116C341.275 78.8369 338.186 73.9161 335.708 72.2153C333.23 70.5146 331.27 68.6097 327.04 67.68C322.809 66.7502 318.752 67.4986 316.666 69.1993C314.579 70.9001 313.023 71.0701 314.118 72.2153Z" fill="#2EC662"/>
<path opacity="0.3" d="M397.503 107.942C397.384 108.71 397.002 109.414 396.42 109.938C392.362 112.773 387.544 102.92 381.965 101.026C376.386 99.1325 373.896 92.1141 372.743 93.6334C371.591 95.1528 371.971 97.239 370.242 99.6995C368.513 102.16 366 101.593 364.848 106.332C363.695 111.072 370.242 119.791 368.698 122.637C367.153 125.483 365.239 124.531 362.139 124.349C359.038 124.168 359.637 126.81 355.603 125.664C351.569 124.519 355.015 119.598 348.687 113.725C342.359 107.852 340.203 106.718 341.563 104.053C342.924 101.389 340.987 97.6132 343.869 97.2504C346.75 96.8875 349.079 101.037 351.004 102.171C352.929 103.305 355.43 99.9035 355.615 96.8649C355.799 93.8262 348.871 89.665 346.393 87.3066C343.915 84.9482 343.604 76.3764 344.572 74.6983C345.54 73.0202 348.433 73.5645 349.183 69.3919C349.632 66.9429 345.725 62.8497 342.359 59.8904C363.509 72.5417 382.185 88.8158 397.503 107.942Z" fill="#2EC662"/>
<path opacity="0.3" d="M426.286 277.894C426.862 271.828 423.773 271.442 426.862 260.262C429.952 249.083 423.589 237.132 421.272 234.672C418.955 232.211 413.952 232.96 409.906 235.431C405.86 237.903 408.754 239.785 406.045 240.738C403.336 241.69 400.65 240.159 398.149 240.352C395.648 240.545 393.331 246.804 387.936 246.611C382.542 246.418 379.072 238.833 375.026 233.436C370.98 228.039 362.681 224.626 360.041 217.982C357.402 211.337 362.543 201.121 361.39 193.343C360.237 185.565 355.027 187.277 354.059 182.923C353.091 178.569 354.831 180.656 356.18 176.472C357.528 172.288 354.635 170.032 357.333 162.866C360.03 155.7 364.848 152.06 363.684 148.84C362.52 145.62 358.866 140.314 358.67 136.527C358.474 132.74 362.335 132.921 369.655 127.603C376.974 122.286 378.876 122.682 384.501 124.576C388.513 126.033 392.638 127.171 396.835 127.977C400.109 128.544 404.546 136.889 405.895 136.504C407.244 136.118 407.44 133.669 408.016 130.064C408.384 128.499 409.219 127.077 410.414 125.982C432.164 160.295 443.008 200.213 441.556 240.624C440.104 281.035 426.423 320.101 402.264 352.818C421.883 323.27 425.698 283.948 426.286 277.894Z" fill="#2EC662"/>
<path opacity="0.1" d="M395.152 361.809C373.134 388.352 344.645 408.984 312.339 421.782C280.033 434.581 244.96 439.131 210.385 435.008C175.811 430.885 142.859 418.224 114.597 398.203C86.3359 378.182 63.6842 351.453 48.751 320.503C33.8179 289.554 27.0889 255.391 29.1905 221.195C31.2922 186.999 42.1562 153.882 60.771 124.928C79.3859 95.9732 105.146 72.1226 135.654 55.5965C166.161 39.0705 200.424 30.4063 235.252 30.4106C240.915 30.4106 246.525 30.6336 252.081 31.0796C253.614 31.193 255.147 31.3291 256.692 31.4991C227.515 34.6155 199.476 44.3679 174.793 59.9848C150.11 75.6017 129.461 96.6546 114.478 121.478C99.4961 146.301 90.592 174.213 88.4708 203.006C86.3496 231.798 91.0694 260.682 102.257 287.37C113.444 314.059 130.792 337.82 152.928 356.774C175.064 375.729 201.381 389.356 229.796 396.577C258.211 403.799 287.944 404.417 316.644 398.382C345.344 392.348 372.222 379.827 395.152 361.809Z" fill="black"/>
<path opacity="0.1" d="M441.651 233.436C441.725 276.326 427.918 318.127 402.23 352.784C382.87 378.968 357.452 400.243 328.077 414.85C353.65 400.447 375.834 380.883 393.17 357.444C417.471 324.538 431.233 285.246 432.693 244.599C434.153 203.953 423.245 163.803 401.365 129.293C397.391 123.015 393.065 116.958 388.409 111.151C373.021 91.9084 354.255 75.5306 332.999 62.7931C305.439 46.2989 274.328 36.3959 242.168 33.8802C236.601 33.438 230.941 33.2112 225.258 33.2112C208.458 33.2004 191.719 35.1877 175.405 39.1299C194.81 33.3467 214.976 30.4087 235.252 30.4106C240.915 30.4106 246.525 30.6336 252.081 31.0796C303.743 35.2211 351.928 58.3375 387.053 95.8314C422.177 133.325 441.669 182.45 441.651 233.436Z" fill="white"/>
<g opacity="0.6">
<path opacity="0.6" d="M227.759 338.021C227.759 338.021 29.1518 380.551 9.32568 347.341C0.104211 331.853 43.5834 308.847 43.5834 308.847C43.5834 308.847 14.6511 329.12 27.8493 337.103C52.4591 351.967 188.314 318.213 188.314 318.213L227.759 338.021Z" fill="#EBEBEB"/>
<path opacity="0.6" d="M109.609 361.798L139.302 357.523C144.247 356.786 149.192 356.151 154.126 355.369C159.059 354.587 163.993 353.906 168.926 353.101C173.86 352.296 178.782 351.571 183.692 350.72C188.603 349.87 193.502 348.997 198.435 348.203C208.244 346.389 218.031 344.439 227.817 342.353C218.392 345.734 208.769 348.555 199 350.8C194.112 351.933 189.202 352.954 184.28 353.884C179.358 354.813 174.413 355.63 169.468 356.457C164.523 357.285 159.555 357.909 154.575 358.51C152.097 358.805 149.607 359.099 147.118 359.36C144.628 359.621 142.126 359.904 139.637 360.108C129.585 361.061 119.58 361.73 109.609 361.798Z" fill="#EBEBEB"/>
<path opacity="0.6" d="M34.604 321.966C33.8391 323.06 33.2628 324.271 32.898 325.549C32.7434 326.153 32.6659 326.774 32.6675 327.397C32.6928 327.972 32.8379 328.535 33.094 329.053C33.6333 330.082 34.4994 330.91 35.5607 331.411C36.6563 331.983 37.8172 332.424 39.0188 332.726C41.5926 333.318 44.2165 333.675 46.857 333.792C49.5197 333.996 52.2285 334.03 54.9258 334.007C57.6231 333.985 60.3434 333.939 63.0638 333.837C65.7841 333.735 68.5044 333.611 71.2248 333.497C76.6885 333.27 82.1637 332.919 87.6966 332.896C82.3978 334.318 77.0113 335.401 71.5706 336.139C70.2104 336.355 68.8387 336.525 67.467 336.649C66.0953 336.774 64.7236 336.955 63.3404 337.046C60.5855 337.262 57.8075 337.364 55.0296 337.409C49.4736 337.33 43.8255 337.114 38.3156 335.255C36.9115 334.775 35.5812 334.107 34.3619 333.27C33.0387 332.391 32.0463 331.108 31.5379 329.62C31.1385 328.142 31.3196 326.572 32.045 325.22C32.6668 323.977 33.5371 322.87 34.604 321.966Z" fill="#EBEBEB"/>
<path opacity="0.6" d="M197.478 167.855C197.478 167.855 396.42 126.855 400.719 88.6335C402.725 70.7868 353.459 67.2493 353.459 67.2493C353.459 67.2493 386.611 73.1566 379.556 86.7173C364.352 115.97 197.478 167.855 197.478 167.855Z" fill="#EBEBEB"/>
<path opacity="0.6" d="M315.248 142.083C306.026 146.04 296.655 149.452 287.168 152.627C284.805 153.444 282.419 154.203 280.033 154.952C277.647 155.7 275.261 156.448 272.864 157.219C268.068 158.671 263.239 159.974 258.421 161.324C253.602 162.673 248.715 163.83 243.828 164.929C238.94 166.029 234.03 167.072 229.119 168.025C219.264 169.907 209.302 171.198 199.288 171.891C209.109 169.862 218.883 167.719 228.543 165.428C233.373 164.17 238.237 163.161 243.044 161.8C247.85 160.439 252.692 159.317 257.51 158.047C262.328 156.777 267.146 155.473 271.941 154.135C276.737 152.797 281.555 151.459 286.362 150.155L315.248 142.083Z" fill="#EBEBEB"/>
<path opacity="0.6" d="M367.13 75.6055C368.518 76.0652 369.726 76.9367 370.589 78.0999C371.045 78.7206 371.377 79.4209 371.568 80.1635C371.736 80.9074 371.786 81.6722 371.718 82.4312C371.541 83.9345 371.05 85.3857 370.277 86.6944C369.562 87.9735 368.716 89.1778 367.753 90.2887C363.877 94.4867 359.405 98.1109 354.474 101.049C352.053 102.534 349.61 103.94 347.108 105.255C345.863 105.913 344.595 106.537 343.328 107.149C342.06 107.761 340.792 108.396 339.489 108.94C334.358 111.269 329.079 113.269 323.686 114.927C328.492 111.979 333.414 109.337 338.256 106.582C340.676 105.187 343.132 103.883 345.506 102.443C347.881 101.003 350.301 99.6655 352.618 98.1802C354.935 96.6949 357.229 95.2322 359.534 93.6448C361.75 92.0856 363.849 90.3729 365.816 88.5199C366.758 87.5973 367.625 86.604 368.41 85.5492C369.195 84.5352 369.771 83.3796 370.104 82.1477C370.256 81.5512 370.322 80.9367 370.3 80.3222C370.24 79.6994 370.076 79.0904 369.816 78.5194C369.208 77.3254 368.279 76.3178 367.13 75.6055Z" fill="#EBEBEB"/>
</g>
<path d="M258.156 347.342C256.657 345.641 235.782 331.298 234.214 330.221L237.776 329.62C237.776 329.62 256.865 345.573 258.156 347.342Z" fill="#D7D7DC"/>
<path opacity="0.5" d="M258.156 347.342C256.657 345.641 235.782 331.298 234.214 330.221L237.776 329.62C237.776 329.62 256.865 345.573 258.156 347.342Z" fill="white"/>
<path d="M258.225 347.466C258.225 347.466 258.225 347.466 258.225 347.534C258.063 347.897 256.634 348.215 255.032 348.43H254.974C253.498 348.699 251.988 348.729 250.502 348.521C250.052 348.215 234.987 340.799 225.765 336.264L225.396 336.094H225.327L224.025 335.448L220.221 333.588L218.745 332.862L234.249 330.255C235.137 330.856 242.179 335.697 248.415 340.108L249.061 340.561C249.637 340.969 250.214 341.378 250.767 341.763C253.339 343.501 255.817 345.371 258.19 347.364C258.19 347.364 258.19 347.421 258.19 347.444L258.225 347.466Z" fill="#D7D7DC"/>
<g opacity="0.1">
<path opacity="0.1" d="M258.225 347.466C258.225 347.466 258.225 347.466 258.225 347.534C258.063 347.897 256.634 348.214 255.032 348.43H254.974C253.498 348.699 251.988 348.729 250.502 348.521C250.041 348.214 234.583 340.584 225.396 336.048C226.906 336.774 246.733 346.151 250.755 341.718C253.328 343.456 255.805 345.325 258.179 347.319C258.179 347.319 258.179 347.375 258.179 347.398L258.225 347.466Z" fill="black"/>
</g>
<path d="M462.445 364.201C462.445 366.242 451.022 366.9 449.466 366.469C447.91 366.038 323.42 317.85 323.42 317.85L369.17 300.038L370.496 300.933L371.072 301.33C379.51 307.067 404.696 324.245 426.689 339.359L427.992 340.255L429.721 341.389C444.971 351.933 458.192 361.083 462.445 364.201Z" fill="#D7D7DC"/>
<path d="M462.446 364.201C451.311 356.026 378.68 306.523 369.17 300.049L374.934 297.781C374.934 297.781 459.541 361.083 462.1 363.601C462.289 363.75 462.413 363.965 462.446 364.201Z" fill="#D7D7DC"/>
<path opacity="0.5" d="M462.446 364.201C451.311 356.026 378.68 306.523 369.17 300.049L374.934 297.781C374.934 297.781 459.541 361.083 462.1 363.601C462.289 363.75 462.413 363.965 462.446 364.201Z" fill="white"/>
<g opacity="0.5">
<path opacity="0.1" d="M462.445 364.201C462.445 366.242 451.022 366.9 449.466 366.469C447.91 366.038 323.42 317.85 323.42 317.85L369.17 300.038C369.17 300.038 357.862 312.759 384.708 332.341C403.002 345.686 422.482 348.452 429.663 341.411C444.971 351.933 458.192 361.083 462.445 364.201Z" fill="black"/>
</g>
<path d="M358.762 333.656C355.223 335.345 351.385 336.661 351.096 333.168C350.993 331.74 352.122 330.209 357.805 327.499C359.131 326.864 362.416 325.458 363.349 328.361C364.283 331.264 360.087 333.01 358.762 333.656Z" fill="#D7D7DC"/>
<path opacity="0.1" d="M358.762 333.656C355.223 335.345 351.385 336.661 351.096 333.168C350.993 331.74 352.122 330.209 357.805 327.499C359.131 326.864 362.416 325.458 363.349 328.361C364.283 331.264 360.087 333.01 358.762 333.656Z" fill="black"/>
<path d="M387.613 345.267C384.075 346.956 380.225 348.283 379.948 344.79C379.833 343.35 380.963 341.82 386.657 339.121C387.982 338.486 391.268 337.092 392.201 339.994C393.135 342.897 388.939 344.632 387.613 345.267Z" fill="#D7D7DC"/>
<path opacity="0.1" d="M387.613 345.267C384.075 346.956 380.225 348.283 379.948 344.79C379.833 343.35 380.963 341.82 386.657 339.121C387.982 338.486 391.268 337.092 392.201 339.994C393.135 342.897 388.939 344.632 387.613 345.267Z" fill="black"/>
<path d="M416.454 356.877C412.926 358.567 409.076 359.893 408.8 356.401C408.684 354.972 409.814 353.442 415.497 350.732C416.834 350.108 420.108 348.702 421.053 351.605C421.998 354.507 417.791 356.242 416.454 356.877Z" fill="#D7D7DC"/>
<path opacity="0.1" d="M416.454 356.877C412.926 358.567 409.076 359.893 408.8 356.401C408.684 354.972 409.814 353.442 415.497 350.732C416.834 350.108 420.108 348.702 421.053 351.605C421.998 354.507 417.791 356.242 416.454 356.877Z" fill="black"/>
<path d="M407.002 326.411C403.544 332.499 395.636 334.688 390.645 336.615C377.378 341.831 367.764 344.756 362.981 332.908C362.413 331.539 362.056 330.094 361.92 328.622C361.136 319.687 370.554 315.22 375.326 312.748C381.089 309.755 385.17 307.827 388.213 306.569C393.169 304.505 395.383 304.301 397.653 304.176C400.339 304.085 406.391 304.754 408.385 315.685C409.247 319.307 408.756 323.114 407.002 326.411Z" fill="#D7D7DC"/>
<path d="M407.186 317.873C407.186 324.529 402.956 329.926 397.734 329.926C392.512 329.926 388.282 324.529 388.282 317.873C388.282 311.217 392.512 305.82 397.734 305.82C402.956 305.82 407.186 311.217 407.186 317.873Z" fill="#263238"/>
<path d="M406.079 317.873C406.079 323.757 402.345 328.519 397.734 328.519C393.123 328.519 389.377 323.757 389.377 317.873C389.377 311.988 393.123 307.215 397.734 307.215C402.345 307.215 406.079 311.988 406.079 317.873Z" fill="#393939"/>
<path d="M209.086 314.675L206.896 315.469L201.962 317.226L184.902 309.981C168.396 303.008 148.8 294.799 145.054 293.529L145.527 293.665L145.965 293.801L146.541 293.983L146.864 294.096L148.166 294.504L149.504 294.935L153.25 296.148L154.541 296.568L155.693 296.965L156.351 297.18L158.391 297.849L159.739 298.291L177.295 304.097L178.955 304.652L185.49 306.818L196.764 310.571L198.354 311.104C200.176 311.705 201.812 312.238 203.265 312.736L204.521 313.156L205.097 313.349L205.397 313.439C207.749 314.244 209.086 314.675 209.086 314.675Z" fill="#D7D7DC"/>
<path opacity="0.5" d="M209.086 314.675L206.896 315.469L201.962 317.226L184.902 309.981C168.396 303.008 148.8 294.799 145.054 293.529L145.527 293.665L145.965 293.801L146.541 293.983L146.864 294.096L148.166 294.504L149.504 294.935L153.25 296.148L154.541 296.568L155.693 296.965L156.351 297.18L158.391 297.849L159.739 298.291L177.295 304.097L178.955 304.652L185.49 306.818L196.764 310.571L198.354 311.104C200.176 311.705 201.812 312.238 203.265 312.736L204.521 313.156L205.097 313.349L205.397 313.439C207.749 314.244 209.086 314.675 209.086 314.675Z" fill="white"/>
<path d="M201.962 317.227L188.752 321.966C188.752 321.966 159.244 308.496 141.642 300.049L141.458 299.97L141.216 299.856L136.121 297.407C131.568 295.14 128.686 293.643 128.801 293.439C129.285 292.475 140.236 292.237 144.616 293.439H144.743L145.02 293.53C148.662 294.743 167.047 302.43 183.196 309.256L183.565 309.403L184.868 309.959L201.962 317.227Z" fill="#D7D7DC"/>
<g opacity="0.1">
<path opacity="0.1" d="M201.962 317.226L188.752 321.966C188.752 321.966 159.244 308.496 141.642 300.049C144.558 301.273 174.424 314.21 181.779 312.408C182.462 312.288 183.106 312.004 183.651 311.581C184.196 311.157 184.626 310.608 184.902 309.981L201.962 317.226Z" fill="black"/>
</g>
<path d="M235.955 298.7L203.899 313.87C203.899 313.87 204.221 286.828 204.475 267.383C204.475 266.714 204.475 266.056 204.475 265.41C204.475 264.764 204.475 264.344 204.475 263.823C204.556 257.167 204.636 251.804 204.671 249.366C204.786 241.543 205.639 239.955 207.749 241.225C209.858 242.495 219.218 250.511 222.03 254.083C224.336 257.008 229.454 274.764 232.785 286.964C232.785 287.078 232.785 287.168 232.854 287.271C233.05 287.985 233.246 288.676 233.419 289.334C234.952 294.822 235.955 298.7 235.955 298.7Z" fill="#D7D7DC"/>
<g opacity="0.1">
<path opacity="0.1" d="M235.955 298.7L203.899 313.87C203.899 313.87 204.221 286.828 204.475 267.383C209.189 277.746 218.515 291.897 233.465 289.334C234.952 294.822 235.955 298.7 235.955 298.7Z" fill="black"/>
</g>
<path d="M181.502 330.402C178.206 322.283 192.211 314.914 208.118 307.895C224.025 300.877 380.813 232.858 403.544 226.792C426.275 220.726 452.74 229.059 457.213 241.792C463.921 260.954 435.646 277.009 334.083 318.428C320.769 323.86 261.245 337.919 227.771 338.021C191.969 338.135 183.127 334.348 181.502 330.402Z" fill="#D7D7DC"/>
<path opacity="0.5" d="M181.502 330.402C178.206 322.283 192.211 314.914 208.118 307.895C224.025 300.877 380.813 232.858 403.544 226.792C426.275 220.726 452.74 229.059 457.213 241.792C463.921 260.954 435.646 277.009 334.083 318.428C320.769 323.86 261.245 337.919 227.771 338.021C191.969 338.135 183.127 334.348 181.502 330.402Z" fill="white"/>
<path opacity="0.1" d="M334.071 318.474C320.758 323.905 261.233 337.953 227.759 338.067C191.969 338.18 183.128 334.439 181.502 330.447C179.773 326.207 182.782 322.159 188.326 318.259C188.289 319.081 188.435 319.901 188.753 320.662C190.24 324.291 198.262 327.681 230.733 327.579C261.107 327.477 304.793 303.281 316.862 298.36C409.019 260.728 445.04 257.598 438.919 240.239C436.268 232.665 425.087 226.826 411.912 225.227C432.338 222.823 453.27 230.59 457.201 241.815C463.91 260.954 435.634 277.01 334.071 318.474Z" fill="black"/>
<path d="M231.206 303.643L234.802 302.101V307.317L231.206 308.847V303.643Z" fill="#393939"/>
<path d="M237.776 300.843L241.626 299.198V304.414L237.776 306.047V300.843Z" fill="#393939"/>
<path d="M244.588 297.94L248.438 296.296V301.512L244.588 303.145V297.94Z" fill="#393939"/>
<path d="M251.412 295.037L255.251 293.393V298.609L251.412 300.242V295.037Z" fill="#393939"/>
<path d="M258.225 292.135L262.074 290.491V295.706L258.225 297.339V292.135Z" fill="#393939"/>
<path d="M265.049 289.232L268.887 287.588V292.804L265.049 294.448V289.232Z" fill="#393939"/>
<path d="M271.861 286.33L275.711 284.686V289.901L271.861 291.545V286.33Z" fill="#393939"/>
<path d="M278.673 283.427L282.523 281.783V286.998L278.673 288.642V283.427Z" fill="#393939"/>
<path d="M285.497 280.524L289.336 278.88V284.096L285.497 285.74V280.524Z" fill="#393939"/>
<path d="M292.309 277.622L296.159 275.978V281.193L292.309 282.826V277.622Z" fill="#393939"/>
<path d="M299.133 274.719L302.972 273.075V278.291L299.133 279.923V274.719Z" fill="#393939"/>
<path d="M305.946 271.816L309.796 270.172V275.388L305.946 277.021V271.816Z" fill="#393939"/>
<path d="M312.758 268.914L316.608 267.281V272.485L312.758 274.118V268.914Z" fill="#393939"/>
<path d="M319.582 266.011L323.421 264.378V269.583L319.582 271.215V266.011Z" fill="#393939"/>
<path d="M326.395 263.109L330.245 261.476V266.68L326.395 268.313V263.109Z" fill="#393939"/>
<path d="M333.207 260.206L337.057 258.573V263.778L333.207 265.422V260.206Z" fill="#393939"/>
<path d="M340.031 257.303L343.88 255.67V260.875L340.031 262.519V257.303Z" fill="#393939"/>
<path d="M346.843 254.401L350.693 252.768V257.972L346.843 259.616V254.401Z" fill="#393939"/>
<path d="M353.667 251.498L357.505 249.865V255.07L353.667 256.714V251.498Z" fill="#393939"/>
<path d="M360.479 248.595L364.329 246.963V252.167L360.479 253.811V248.595Z" fill="#393939"/>
<path d="M367.292 245.693L371.142 244.06V249.264L367.292 250.908V245.693Z" fill="#393939"/>
<path d="M377.965 241.157V246.362L374.115 248.006V242.79L377.965 241.157Z" fill="#393939"/>
<path d="M384.778 238.255V243.459L380.928 245.103V239.888L384.778 238.255Z" fill="#393939"/>
<path d="M391.59 235.352V240.557L387.752 242.201V236.985L391.59 235.352Z" fill="#393939"/>
<path d="M398.414 232.449V237.654L394.564 239.298V234.082L398.414 232.449Z" fill="#393939"/>
<path d="M416.223 230.318C418.339 228.735 420.776 227.617 423.37 227.041V230.443C421.087 230.42 418.736 230.363 416.223 230.318Z" fill="#393939"/>
<path d="M431.75 226.214V230.998C429.952 230.84 428.165 230.738 426.355 230.647V226.463C428.141 226.21 429.948 226.126 431.75 226.214Z" fill="#393939"/>
<path d="M448.89 232.971C447.38 232.971 445.997 232.677 444.614 232.518C443.23 232.359 441.882 232.11 440.533 231.985C438.574 231.69 436.637 231.486 434.77 231.305V226.52C437.115 226.833 439.41 227.447 441.594 228.345C442.949 228.889 444.253 229.549 445.49 230.318C446.12 230.689 446.721 231.105 447.288 231.565C447.807 232.019 448.371 232.472 448.89 232.971Z" fill="#393939"/>
<path d="M326.394 275.388L281.209 296.772C281.209 296.772 209.397 258.902 157.872 231.236L157.757 231.168C130.254 216.428 109.252 204.908 109.598 204.466C110.462 203.332 124.294 203.457 129.77 204.194C130.299 204.244 130.823 204.335 131.337 204.466C133.643 205.09 214.918 234.694 271.815 255.489L326.394 275.388Z" fill="#D7D7DC"/>
<g opacity="0.1">
<path opacity="0.1" d="M326.394 275.388L281.209 296.772C281.209 296.772 209.397 258.902 157.872 231.236C161.906 233.232 254.294 279.027 266.363 272.156C270.916 269.56 272.126 262.859 271.792 255.455L326.394 275.388Z" fill="black"/>
</g>
<path d="M332.988 272.497L319.571 278.846C285.244 264.696 142.461 209.172 130.53 204.512L130.162 204.364L129.862 204.274H129.758C130.287 204.324 130.811 204.415 131.326 204.546C134.876 205.476 332.988 272.497 332.988 272.497Z" fill="#D7D7DC"/>
<path opacity="0.5" d="M332.988 272.497L319.571 278.846C285.244 264.696 142.461 209.172 130.53 204.512L130.162 204.364L129.862 204.274H129.758C130.287 204.324 130.811 204.415 131.326 204.546C134.876 205.476 332.988 272.497 332.988 272.497Z" fill="white"/>
<path d="M236.22 273.528C231.805 275.637 226.999 277.293 226.653 272.927C226.514 271.136 227.921 269.22 235.033 265.864C236.693 265.07 240.796 263.312 241.949 266.997C243.102 270.682 237.891 272.735 236.22 273.528Z" fill="#D7D7DC"/>
<path opacity="0.1" d="M236.22 273.528C231.805 275.637 226.999 277.293 226.653 272.927C226.514 271.136 227.921 269.22 235.033 265.864C236.693 265.07 240.796 263.312 241.949 266.997C243.102 270.682 237.891 272.735 236.22 273.528Z" fill="black"/>
<path d="M197.985 254.525C193.571 256.634 188.764 258.29 188.418 253.924C188.28 252.133 189.686 250.228 196.798 246.861C198.458 246.067 202.562 244.321 203.714 247.994C204.867 251.668 199.657 253.732 197.985 254.525Z" fill="#D7D7DC"/>
<path opacity="0.1" d="M197.985 254.525C193.571 256.634 188.764 258.29 188.418 253.924C188.28 252.133 189.686 250.228 196.798 246.861C198.458 246.067 202.562 244.321 203.714 247.994C204.867 251.668 199.657 253.732 197.985 254.525Z" fill="black"/>
<path d="M159.636 235.295C155.52 237.268 151.037 238.81 150.714 234.74C150.587 233.073 151.866 231.338 158.517 228.164C160.074 227.427 163.866 225.794 164.972 229.173C166.079 232.552 161.18 234.57 159.636 235.295Z" fill="#D7D7DC"/>
<path opacity="0.1" d="M159.636 235.295C155.52 237.268 151.037 238.81 150.714 234.74C150.587 233.073 151.866 231.338 158.517 228.164C160.074 227.427 163.866 225.794 164.972 229.173C166.079 232.552 161.18 234.57 159.636 235.295Z" fill="black"/>
<path d="M293.266 269.22C289.808 275.309 281.901 277.497 276.909 279.424C263.642 284.64 254.029 287.577 249.245 275.717C248.677 274.348 248.32 272.903 248.185 271.431C247.401 262.496 256.818 258.029 261.59 255.557C267.354 252.575 271.434 250.636 274.477 249.378C279.434 247.325 281.647 247.11 283.918 246.985C286.604 246.895 292.655 247.564 294.649 258.494C295.511 262.117 295.02 265.923 293.266 269.22Z" fill="#D7D7DC"/>
<path d="M283.975 272.78C289.196 272.78 293.427 267.384 293.427 260.728C293.427 254.071 289.196 248.675 283.975 248.675C278.755 248.675 274.523 254.071 274.523 260.728C274.523 267.384 278.755 272.78 283.975 272.78Z" fill="#263238"/>
<path d="M292.321 260.728C292.321 266.612 288.586 271.374 283.975 271.374C279.365 271.374 275.619 266.612 275.619 260.728C275.619 254.843 279.365 250.081 283.975 250.081C288.586 250.081 292.321 254.843 292.321 260.728Z" fill="#393939"/>
<path d="M149.503 294.958L148.166 294.527L149.503 294.958Z" fill="#D7D7DC"/>
</svg>

                </div>
            </div>
            <Footer />
        </div>
    )
}
