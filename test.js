//Add your tests here
const { exec } = require('child_process');
const { expect } = require('chai');

const { updateFileContent } = require('./test_method/updateFile')

const inputs = [
    'ADD_PROGRAMME DIPLOMA 1\nADD_PROGRAMME CERTIFICATION 1\nAPPLY_COUPON DEAL_G20\nADD_PRO_MEMBERSHIP\nPRINT_BILL',
    'ADD_PROGRAMME DEGREE 1\nADD_PROGRAMME DIPLOMA 2\nAPPLY_COUPON DEAL_G20\nAPPLY_COUPON DEAL_G5\nPRINT_BILL',
    'ADD_PROGRAMME CERTIFICATION 1\nADD_PROGRAMME DEGREE 1\nADD_PROGRAMME DIPLOMA 2\nAPPLY_COUPON DEAL_G20\nPRINT_BILL'
]

const outputs = [
    'SUB_TOTAL 5615.00\nCOUPON_DISCOUNT NONE 0.00\nTOTAL_PRO_DISCOUNT 85.00\nPRO_MEMBERSHIP_FEE 200.00\nENROLLMENT_FEE 500.00\nTOTAL 6115.00',
    'SUB_TOTAL 10000.00\nCOUPON_DISCOUNT DEAL_G20 2000.00\nTOTAL_PRO_DISCOUNT 0.00\nPRO_MEMBERSHIP_FEE 0.00\nENROLLMENT_FEE 0.00\nTOTAL 8000.00',
    'SUB_TOTAL 13000.00\nCOUPON_DISCOUNT B4G1 2500.00\nTOTAL_PRO_DISCOUNT 0.00\nPRO_MEMBERSHIP_FEE 0.00\nENROLLMENT_FEE 0.00\nTOTAL 10500.00'
]

const executionStatement = 'node geektrust.js test.txt'

describe('Running Test Cases For Geekdemy ', () => {

    for (let i = 0; i < 3; i++) {

        it(`\n\nTest Case : ${i + 1} \n\tshould update the file content, run the app, and verify output`, (done) => {
            const filename = 'test.txt';
            const newContent = inputs[i];

            // Update the file content
            updateFileContent(filename, newContent);


            // Run the app
            exec(executionStatement, (error, stdout, stderr) => {
                if (error) {
                    done(error);
                } else {
                    // Verify if the output matches the expected output
                    const expectedOutput = outputs[i];
                    expect(stdout.trim()).to.equal(expectedOutput);
                    done();
                }
            });
        });
    }
});

