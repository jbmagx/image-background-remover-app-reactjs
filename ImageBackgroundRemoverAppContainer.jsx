import { useEffect, useState } from 'react';
import { Avatar, Button, Chip, Link } from '@nextui-org/react';
import { removeBackground } from '@imgly/background-removal';
import { GitHubIcon } from '../../../assets/images/svg-jsx/github-icon.jsx';
import { Compare } from '../../../components/aceternity/components/compare.jsx';

const ImageBackgroundRemoverAppContainer = () => {
    const [imageName, setImageName] = useState('');
    const [originalImage, setOriginalImage] = useState('');
    const [processedImage, setProcessedImage] = useState('');
    const [removingBackground, setRemovingBackground] = useState(false);

    // Function to handle image upload
    const handleImageUpload = (event) => {
        setRemovingBackground(true);
        setProcessedImage('');

        // Get the selected file(s)
        const file = event.target.files[0];

        // Check if a file was selected
        if (!file) {
            setRemovingBackground(false);
            alert('No file selected. Please upload an image.');
            return;
        }

        // Validate if the file is an image
        if (!file.type.startsWith('image/')) {
            setRemovingBackground(false);
            alert('Invalid file type. Please upload an image.');
            return;
        }

        // Update the image name
        setImageName(file.name.split('.')[0]);

        // Read the file
        const reader = new FileReader();
        reader.onload = () => setOriginalImage(reader.result);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (originalImage) {
            const handleBackgroundRemoval = async () => {
                try {
                    const blob = await removeBackground(originalImage);
                    const reader = new FileReader();
                    reader.onload = () => setProcessedImage(reader.result);
                    reader.readAsDataURL(blob);
                } catch (error) {
                    console.error('Error removing background:', error);
                } finally {
                    setRemovingBackground(false);
                }
            };

            handleBackgroundRemoval();
        }
    }, [originalImage]);

    const techStack = [
        { name: 'ReactJS', link: 'https://react.dev/', color: 'primary' },
        { name: '@imgly/background-removal', link: 'https://www.npmjs.com/package/@imgly/background-removal', color: 'danger' },
        { name: 'NextUI', link: 'https://nextui.org/', color: 'secondary' },
        { name: 'AceternityUI', link: 'https://ui.aceternity.com/', color: 'warning' },
        { name: 'Tailwind CSS', link: 'https://tailwindcss.com/', color: 'success' },
    ];

    return (
        <div className="flex flex-col w-full gap-y-10 max-w-[64rem] mx-auto min-h-[calc(100vh-16.75rem)] py-20 sm2:py-16 sm:py-14 xs:py-12 xxs:py-10 px-6" aria-busy={removingBackground} aria-live="polite">
            <div className="flex items-center justify-center">
                <h2 className="font-semibold text-xl text-default-800">Image Background Remover</h2>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5">
                <div className="flex w-full flex-col max-w-[20rem]">
                    {processedImage && (
                        <Compare
                            firstImage={originalImage}
                            secondImage={processedImage}
                            firstImageClassName="object-contain  rounded-small"
                            secondImageClassname="object-contain  rounded-small"
                            className="h-[24rem] w-[20rem] xxs:h-[20rem] xs:w-full xxs:w-full rounded-small border"
                            slideMode="hover"
                        />
                    )}

                    {(!originalImage || !processedImage) && (
                        <Avatar
                            showFallback={!originalImage}
                            src={originalImage}
                            radius="sm"
                            classNames={{
                                base: `w-[20rem] h-[24rem] xxs:h-[20rem] xs:w-full xxs:w-full border-transparent`,
                                img: 'object-contain',
                            }}
                        />
                    )}
                </div>

                <div className="flex flex-wrap xl:items-center xl:flex-col lg:items-center lg:flex-col md:items-center md:flex-col w-full gap-y-5 sm2:gap-x-4 sm:gap-x-4 xs:gap-x-4 max-w-[20rem]">
                    <div className="flex items-center justify-center w-64 sm2:w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.5rem)] xs:w-[calc(50%-0.5rem)] xxs:w-full">
                        <label
                            htmlFor="imageFileInput"
                            className="flex items-center justify-center cursor-pointer h-10 w-full px-6 font-medium bg-primary text-white rounded-small shadow-small text-sm xs:text-small xxs:text-small hover:opacity-80 duration-300"
                            aria-label="Upload an image to remove the background"
                        >
                            Upload Image
                        </label>
                        <input id="imageFileInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" aria-label="Choose an image file" aria-describedby="upload-instructions" />
                    </div>

                    <a
                        href={processedImage}
                        download={`${imageName}-background-removed.png`}
                        className="flex items-center justify-center h-fit w-64 sm2:w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.5rem)] xs:w-[calc(50%-0.5rem)] xxs:w-full"
                        onClick={(event) => {
                            if (!processedImage || removingBackground) event.preventDefault();
                        }}
                    >
                        <Button
                            radius="sm"
                            color="primary"
                            variant="ghost"
                            className="w-full font-medium"
                            isDisabled={!processedImage || removingBackground}
                            isLoading={(originalImage && !processedImage) || removingBackground}
                            aria-disabled={!processedImage || removingBackground}
                            aria-live="assertive"
                        >
                            {(originalImage && !processedImage) || removingBackground ? '' : 'Download'}
                        </Button>
                    </a>
                </div>
            </div>

            <div className="flex items-center w-full max-w-2xl mx-auto">
                <p className="text-sm text-default-800">
                    This image background remover app lets you easily remove backgrounds from your images using the @imgly/background-removal npm package. The entire process runs locally in your browser, ensuring that your images are never
                    uploaded to a server, making it a safe and secure option for protecting your privacy.
                </p>
            </div>

            <div className="flex flex-wrap align-center justify-center gap-2 xs:max-w-[276px] mx-auto">
                <div className="self-center font-semibold uppercase text-small tracking-tight">Tech Stack:</div>
                <div className="flex flex-wrap align-center justify-center gap-2">
                    {techStack.map((tech, index) => (
                        <Link key={index} href={tech.link} target="_blank">
                            <Chip variant="solid" color={tech.color} radius="sm" size="sm" classNames={{ content: "font-['Inter',sans-serif] font-semibold" }}>
                                {tech.name}
                            </Chip>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                <Link href="https://github.com/jbmagx/timer-stopwatch-reactjs" target="_blank">
                    <Button className="bg-[#0A7EA4] text-sm uppercase font-semibold py-6 px-8" color="primary" variant="solid" radius="full" endContent={<GitHubIcon height={32} width={32} fill={'#FFFFFF'} />}>
                        Project Repository
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ImageBackgroundRemoverAppContainer;
