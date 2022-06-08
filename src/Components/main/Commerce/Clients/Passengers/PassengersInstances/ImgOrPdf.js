import React, { useEffect, useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';

const ImgOrPdf = ({ label, name, handleChange, url, children }) => {
	const [isPdf, setIsPdf] = useState(false);

	const convertToUrl = ({ target: { name, files } }) => {
		let isPdf = false;
		if (!files.length) return handleChange({ name, file: null, url: null });

		const file = files[0];
		isPdf = file.type === 'application/pdf';
		const url = URL.createObjectURL(file);
		setIsPdf(isPdf);
		handleChange({ name, file, url });
	};

	useEffect(() => {
		if (url?.endsWith('.pdf')) setIsPdf(true);
		else setIsPdf(false);
	}, [url]);

	const handleChangeDelete = () =>
		handleChange({ name, file: null, url: null });

	return (
		<div class='row'>
			<div class='col-lg-12'>
				<div class='form-group'>
					<label
						for='photo'
						class='label-100'
						style={children ? { margin: '0px', padding: '0px' } : {}}
					>
						{label}
					</label>
					{children}
					<input
						type='file'
						name={name}
						class='form-control input-field'
						id='photo'
						accept='image/* ,application/pdf'
						required
						onChange={convertToUrl}
					/>
					<span>(only image or Pdf of 1 mb allowed)</span>
				</div>

				{url && (
					<>
						{!isPdf ? (
							<img
								src={url}
								style={{ height: '200px', width: '200px' }}
								alt=''
							/>
						) : (
							<div style={{ width: '200px', height: '200px' }}>
								<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
									<Viewer fileUrl={url} />
								</Worker>
							</div>
						)}
						<div
							style={{ marginTop: 5 }}
							className='btn btn-danger ml-5'
							onClick={handleChangeDelete}
						>
							Delete
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ImgOrPdf;
